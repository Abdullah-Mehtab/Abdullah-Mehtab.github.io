#ifndef MAP_H
#define MAP_H

#include <stdint.h>

void clear_map(uint8_t *memory);
void set_tile(uint8_t *memory, int x, int y, uint8_t value);
uint8_t get_tile(uint8_t *memory, int x, int y);

#endif
