#include "collision.h"
#include "types.h"

#ifdef __wasm_simd128__
#include <wasm_simd128.h>
#endif

int check_map_collision(uint8_t *memory, int32_t x, int32_t y, int32_t w, int32_t h) {
    uint8_t *map = memory + MAP_OFFSET;

    int left   = x >> FP_SHIFT;
    int top    = y >> FP_SHIFT;
    int right  = (x + w) >> FP_SHIFT;
    int bottom = (y + h) >> FP_SHIFT;

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (right >= MAP_WIDTH) right = MAP_WIDTH - 1;
    if (bottom >= MAP_HEIGHT) bottom = MAP_HEIGHT - 1;

    for (int ty = top; ty <= bottom; ty++) {
        for (int tx = left; tx <= right; tx++) {
            if (map[ty * MAP_WIDTH + tx] == 1) {
                return 1;
            }
        }
    }
    return 0;
}

#ifdef __wasm_simd128__
uint32_t check_entity_collisions_simd(
    float px, float py, float pw, float ph,
    float *ex, float *ey, float *ew, float *eh,
    int count
) {
    uint32_t result = 0;

    float pl = px;
    float pr = px + pw;
    float pt = py;
    float pb = py + ph;

    v128_t v_pl = wasm_f32x4_splat(pl);
    v128_t v_pr = wasm_f32x4_splat(pr);
    v128_t v_pt = wasm_f32x4_splat(pt);
    v128_t v_pb = wasm_f32x4_splat(pb);

    int i;
    for (i = 0; i + 3 < count; i += 4) {
        v128_t el = wasm_v128_load(&ex[i]);
        v128_t er = wasm_f32x4_add(el, wasm_v128_load(&ew[i]));
        v128_t et = wasm_v128_load(&ey[i]);
        v128_t eb = wasm_f32x4_add(et, wasm_v128_load(&eh[i]));

        v128_t c1 = wasm_f32x4_lt(v_pl, er);
        v128_t c2 = wasm_f32x4_gt(v_pr, el);
        v128_t c3 = wasm_f32x4_lt(v_pt, eb);
        v128_t c4 = wasm_f32x4_gt(v_pb, et);
        v128_t overlap = wasm_v128_and(wasm_v128_and(c1, c2), wasm_v128_and(c3, c4));

        if (wasm_i32x4_extract_lane(overlap, 0)) result |= (1u << (i + 0));
        if (wasm_i32x4_extract_lane(overlap, 1)) result |= (1u << (i + 1));
        if (wasm_i32x4_extract_lane(overlap, 2)) result |= (1u << (i + 2));
        if (wasm_i32x4_extract_lane(overlap, 3)) result |= (1u << (i + 3));
    }

    for (; i < count; i++) {
        float el = ex[i], er = ex[i] + ew[i];
        float et = ey[i], eb = ey[i] + eh[i];
        if (pl < er && pr > el && pt < eb && pb > et) {
            result |= (1u << i);
        }
    }

    return result;
}
#else
uint32_t check_entity_collisions_simd(
    float px, float py, float pw, float ph,
    float *ex, float *ey, float *ew, float *eh,
    int count
) {
    uint32_t result = 0;
    float pl = px, pr = px + pw, pt = py, pb = py + ph;
    for (int i = 0; i < count; i++) {
        float el = ex[i], er = ex[i] + ew[i];
        float et = ey[i], eb = ey[i] + eh[i];
        if (pl < er && pr > el && pt < eb && pb > et) {
            result |= (1u << i);
        }
    }
    return result;
}
#endif
