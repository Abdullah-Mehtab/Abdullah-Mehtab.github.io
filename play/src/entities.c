#include "entities.h"
#include "types.h"

void init_entities(uint8_t *memory) {
    uint8_t *ents = memory + ENTITY_OFFSET;
    for (int i = 0; i < MAX_ENTITIES * ENTITY_SIZE; i++) {
        ents[i] = 0;
    }
}

void update_entities(uint8_t *memory, float dt) {
    int32_t *ents = (int32_t *)(memory + ENTITY_OFFSET);
    for (int i = 0; i < MAX_ENTITIES; i++) {
        int32_t *ent = ents + (i * (ENTITY_SIZE / 4));
        int32_t flags = ent[6];
        if (!(flags & ENT_ACTIVE)) continue;
        if (flags & ENT_NPC) {
            ent[10] += FLOAT_TO_FP(dt);
            if (ent[10] > FLOAT_TO_FP(0.5f)) {
                ent[10] = 0;
                ent[9] = (ent[9] + 1) % 2;
            }
        }
    }
}
