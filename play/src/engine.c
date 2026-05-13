#include "types.h"
#include "collision.h"
#include "entities.h"
#include "map.h"
#include "interaction.h"
#include <emscripten.h>
#include <string.h>

// Static memory block - the single source of truth
static uint8_t game_memory[0x18280];

EMSCRIPTEN_KEEPALIVE
void init_engine(void) {
    memset(game_memory, 0, sizeof(game_memory));
    clear_map(game_memory);
    init_entities(game_memory);

    int32_t *player = (int32_t *)(game_memory + PLAYER_OFFSET);
    player[0] = FLOAT_TO_FP(128.0f);
    player[1] = FLOAT_TO_FP(128.0f);
    player[2] = FLOAT_TO_FP(0.8f);
    player[3] = FLOAT_TO_FP(0.8f);
    player[4] = DIR_DOWN;
    player[5] = FLOAT_TO_FP(3.5f);
    player[8] = ENT_ACTIVE;
}

EMSCRIPTEN_KEEPALIVE
void update(void) {
    uint32_t input_mask = *(uint32_t *)(game_memory + INPUT_OFFSET);
    float dt = *(float *)(game_memory + INPUT_OFFSET + 4);
    int32_t *player = (int32_t *)(game_memory + PLAYER_OFFSET);
    int32_t *game_flags = (int32_t *)(game_memory + GAME_FLAGS_OFFSET);

    update_entities(game_memory, dt);

    if (game_flags[1] || game_flags[2]) return;

    int32_t speed = player[5];
    int32_t dx = 0, dy = 0;

    int up = (input_mask & INPUT_UP) != 0;
    int down = (input_mask & INPUT_DOWN) != 0;
    int left = (input_mask & INPUT_LEFT) != 0;
    int right = (input_mask & INPUT_RIGHT) != 0;

    if (up && !down) { dy = -speed; player[4] = DIR_UP; }
    if (down && !up) { dy = speed; player[4] = DIR_DOWN; }
    if (left && !right) { dx = -speed; player[4] = DIR_LEFT; }
    if (right && !left) { dx = speed; player[4] = DIR_RIGHT; }

    int32_t fp_dt = FLOAT_TO_FP(dt);
    int32_t move_x = (int32_t)(((int64_t)dx * fp_dt) >> FP_SHIFT);
    int32_t move_y = (int32_t)(((int64_t)dy * fp_dt) >> FP_SHIFT);

    int32_t new_x = player[0] + move_x;
    int32_t new_y = player[1];
    if (!check_map_collision(game_memory, new_x, new_y, player[2], player[3])) {
        player[0] = new_x;
    }

    new_y = player[1] + move_y;
    if (!check_map_collision(game_memory, player[0], new_y, player[2], player[3])) {
        player[1] = new_y;
    }

    if (dx != 0 || dy != 0) {
        player[7] += FLOAT_TO_FP(dt);
        if (player[7] > FLOAT_TO_FP(0.15f)) {
            player[7] = 0;
            player[6] = (player[6] + 1) % 4;
        }
    } else {
        player[6] = 0;
        player[7] = 0;
    }
}

EMSCRIPTEN_KEEPALIVE
uint8_t *get_state_ptr(void) {
    return game_memory + PLAYER_OFFSET;
}

EMSCRIPTEN_KEEPALIVE
uint8_t *get_input_ptr(void) {
    return game_memory + INPUT_OFFSET;
}

EMSCRIPTEN_KEEPALIVE
uint8_t *get_map_ptr(void) {
    return game_memory + MAP_OFFSET;
}

EMSCRIPTEN_KEEPALIVE
uint8_t *get_trigger_ptr(void) {
    return game_memory + TRIGGER_OFFSET;
}

EMSCRIPTEN_KEEPALIVE
uint8_t *get_game_flags_ptr(void) {
    return game_memory + GAME_FLAGS_OFFSET;
}

EMSCRIPTEN_KEEPALIVE
int32_t check_interaction(void) {
    return find_interaction(game_memory);
}
