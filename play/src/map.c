#include "map.h"
#include "types.h"

void clear_map(uint8_t *memory) {
    uint8_t *map = memory + MAP_OFFSET;
    for (int i = 0; i < MAP_WIDTH * MAP_HEIGHT; i++) {
        map[i] = 0;
    }
}

void set_tile(uint8_t *memory, int x, int y, uint8_t value) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return;
    uint8_t *map = memory + MAP_OFFSET;
    map[y * MAP_WIDTH + x] = value;
}

uint8_t get_tile(uint8_t *memory, int x, int y) {
    if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) return 1;
    uint8_t *map = memory + MAP_OFFSET;
    return map[y * MAP_WIDTH + x];
}
