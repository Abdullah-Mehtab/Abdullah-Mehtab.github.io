#ifndef COLLISION_H
#define COLLISION_H

#include <stdint.h>

// Returns 1 if the bounding box at (x,y) with (w,h) collides with any solid tile.
// All parameters are fixed-point 16.16.
int check_map_collision(uint8_t *memory, int32_t x, int32_t y, int32_t w, int32_t h);

// SIMD-accelerated batch collision check: player AABB vs an array of entity AABBs.
// Returns bitmask of which entities collide (up to 32 entities per call).
uint32_t check_entity_collisions_simd(
    float px, float py, float pw, float ph,
    float *ex, float *ey, float *ew, float *eh,
    int count
);

#endif
