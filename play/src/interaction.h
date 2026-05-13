#ifndef INTERACTION_H
#define INTERACTION_H

#include <stdint.h>

// Returns the dialogue_id of the nearest interactive entity/trigger
// in front of the player, or -1 if none found.
int32_t find_interaction(uint8_t *memory);

#endif
