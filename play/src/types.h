#ifndef TYPES_H
#define TYPES_H

#include <stdint.h>

// Memory layout offsets
#define INPUT_OFFSET      0x0000
#define PLAYER_OFFSET     0x0040
#define ENTITY_OFFSET     0x0080
#define MAP_OFFSET        0x4080
#define TRIGGER_OFFSET    0x14080
#define GAME_FLAGS_OFFSET 0x18080

// Limits
#define MAX_ENTITIES      256
#define ENTITY_SIZE       64
#define MAX_TRIGGERS      256
#define TRIGGER_SIZE      64
#define MAP_WIDTH         256
#define MAP_HEIGHT        256

// Input bitmask bits
#define INPUT_UP          (1 << 0)
#define INPUT_DOWN        (1 << 1)
#define INPUT_LEFT        (1 << 2)
#define INPUT_RIGHT       (1 << 3)
#define INPUT_INTERACT    (1 << 4)
#define INPUT_PAUSE       (1 << 5)

// Fixed-point helpers (16.16)
#define FP_SHIFT          16
#define FP_ONE            (1 << FP_SHIFT)
#define FLOAT_TO_FP(f)    ((int32_t)((f) * FP_ONE))
#define FP_TO_FLOAT(fp)   ((float)(fp) / (float)FP_ONE)

// Direction enum
#define DIR_DOWN   0
#define DIR_UP     1
#define DIR_LEFT   2
#define DIR_RIGHT  3

// Entity flags
#define ENT_ACTIVE       (1 << 0)
#define ENT_SOLID        (1 << 1)
#define ENT_INTERACTIVE  (1 << 2)
#define ENT_NPC          (1 << 3)

// Player struct layout within PLAYER_OFFSET (64 bytes)
// [0..3]   int32  x (fixed-point)
// [4..7]   int32  y (fixed-point)
// [8..11]  int32  width (fixed-point)
// [12..15] int32  height (fixed-point)
// [16..19] int32  direction
// [20..23] int32  speed (fixed-point)
// [24..27] int32  anim_frame
// [28..31] int32  anim_timer
// [32..35] int32  flags
// [36..63] reserved

// Entity struct layout within each 64-byte slot
// [0..3]   int32  id
// [4..7]   int32  x (fixed-point)
// [8..11]  int32  y (fixed-point)
// [12..15] int32  width (fixed-point)
// [16..19] int32  height (fixed-point)
// [20..23] int32  type
// [24..27] int32  flags
// [28..31] int32  dialogue_id
// [32..35] int32  sprite_id
// [36..39] int32  anim_frame
// [40..43] int32  anim_timer
// [44..63] reserved

// Trigger struct layout within each 64-byte slot
// [0..3]   int32  x (fixed-point)
// [4..7]   int32  y (fixed-point)
// [8..11]  int32  width (fixed-point)
// [12..15] int32  height (fixed-point)
// [16..19] int32  dialogue_id
// [20..23] int32  zone_id
// [24..27] int32  trigger_type (0=dialogue, 1=zone_transition, 2=sign)
// [28..63] reserved

#endif
