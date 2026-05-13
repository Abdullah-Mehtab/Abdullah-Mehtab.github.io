#include "interaction.h"
#include "types.h"

int32_t find_interaction(uint8_t *memory) {
    int32_t *player = (int32_t *)(memory + PLAYER_OFFSET);
    int32_t px = player[0];
    int32_t py = player[1];
    int32_t pw = player[2];
    int32_t ph = player[3];
    int32_t dir = player[4];

    int32_t probe_x = px;
    int32_t probe_y = py;
    int32_t probe_dist = FLOAT_TO_FP(0.75f);

    switch (dir) {
        case DIR_UP:    probe_y -= probe_dist; break;
        case DIR_DOWN:  probe_y += probe_dist + ph; break;
        case DIR_LEFT:  probe_x -= probe_dist; break;
        case DIR_RIGHT: probe_x += probe_dist + pw; break;
    }

    int32_t *triggers = (int32_t *)(memory + TRIGGER_OFFSET);
    for (int i = 0; i < MAX_TRIGGERS; i++) {
        int32_t *t = triggers + (i * (TRIGGER_SIZE / 4));
        int32_t tw = t[2];
        if (tw == 0) continue;

        int32_t tx = t[0], ty = t[1], th = t[3];
        if (probe_x >= tx && probe_x < tx + tw && probe_y >= ty && probe_y < ty + th) {
            return t[4];
        }
    }

    int32_t *ents = (int32_t *)(memory + ENTITY_OFFSET);
    for (int i = 0; i < MAX_ENTITIES; i++) {
        int32_t *ent = ents + (i * (ENTITY_SIZE / 4));
        int32_t flags = ent[6];
        if (!(flags & ENT_ACTIVE) || !(flags & ENT_INTERACTIVE)) continue;

        int32_t ex = ent[1], ey = ent[2], ew = ent[3], eh = ent[4];
        if (probe_x >= ex && probe_x < ex + ew && probe_y >= ey && probe_y < ey + eh) {
            return ent[7];
        }
    }

    return -1;
}
