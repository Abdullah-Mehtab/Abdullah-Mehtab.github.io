// ABOUTME: Orchestrates terrain, roads, landmarks, interactions, and world updates for /play.
// ABOUTME: Preserves portfolio zone contracts while allowing the island layout to be rebuilt.
import * as THREE from 'three';
import {
  ISLAND_RADIUS,
  circuitCheckpoints,
  roadSegments,
  zonePresentation,
  worldZones
} from './worldData.js';
import { Atmosphere } from './Atmosphere.js';
import { Foliage } from './Foliage.js';
import { PotatoFarm } from './PotatoFarm.js';
import { Props } from './Props.js';
import { Roads } from './Roads.js';
import { SetPieces } from './SetPieces.js';
import { Terrain } from './Terrain.js';
import { Water } from './Water.js';
import { Zones } from './Zones.js';
import { createWorldMaterials, QUALITY_ORDER, QUALITY_PROFILES, WATER_Y } from './WorldMaterials.js';

const SURFACES = {
  road: { id: 'road', label: 'road', forwardGrip: 1, sideGrip: 1, engineFactor: 1, topSpeedFactor: 1, drag: 1, dustColor: 0x6f6250, skidColor: 0x161410, skidMarks: true },
  grass: { id: 'grass', label: 'grass', forwardGrip: 0.86, sideGrip: 0.72, engineFactor: 0.92, topSpeedFactor: 0.86, drag: 0.988, dustColor: 0x6e8c42, skidColor: 0x26381d, skidMarks: false },
  sand: { id: 'sand', label: 'sand', forwardGrip: 0.72, sideGrip: 0.56, engineFactor: 0.76, topSpeedFactor: 0.68, drag: 0.965, dustColor: 0xd2a56f, skidColor: 0x8d6338, skidMarks: false },
  shore: { id: 'shore', label: 'shore', forwardGrip: 0.68, sideGrip: 0.48, engineFactor: 0.7, topSpeedFactor: 0.58, drag: 0.948, dustColor: 0x9bd6cf, skidColor: 0x6fa1a0, skidMarks: false },
  water: { id: 'water', label: 'water', forwardGrip: 0.38, sideGrip: 0.28, engineFactor: 0.42, topSpeedFactor: 0.36, drag: 1, dustColor: 0xb8fff0, skidColor: 0x7edbd4, skidMarks: false }
};

const ROAD_SURFACES = {
  avenue: { label: 'avenue asphalt', forwardGrip: 1.03, sideGrip: 1.02, engineFactor: 1.02, topSpeedFactor: 1.03, dustColor: 0x756b5a, skidColor: 0x14120f, audioId: 'avenue-road' },
  street: { label: 'street asphalt', forwardGrip: 1, sideGrip: 0.98, engineFactor: 1, topSpeedFactor: 1, dustColor: 0x6f6250, skidColor: 0x161410, audioId: 'road' },
  plaza: { label: 'plaza stone', forwardGrip: 0.94, sideGrip: 1.06, engineFactor: 0.96, topSpeedFactor: 0.9, dustColor: 0xb9a57a, skidColor: 0x5f584d, audioId: 'plaza-road', roughnessFeedback: 0.26 },
  security: { label: 'scanner asphalt', forwardGrip: 1.02, sideGrip: 0.92, engineFactor: 1.03, topSpeedFactor: 1.02, dustColor: 0x3a6b77, skidColor: 0x081014, audioId: 'security-road', roughnessFeedback: 0.18 },
  dirt: { label: 'farm dirt track', forwardGrip: 0.78, sideGrip: 0.58, engineFactor: 0.82, topSpeedFactor: 0.72, drag: 0.975, dustColor: 0xb2763c, skidColor: 0x6b4828, skidMarks: false, audioId: 'dirt-road', effectId: 'dirt-road', roughnessFeedback: 0.62 },
  bridge: { label: 'pier deck', forwardGrip: 0.96, sideGrip: 0.93, engineFactor: 0.96, topSpeedFactor: 0.88, dustColor: 0x7aa9a7, skidColor: 0x2e4d4b, audioId: 'bridge-road', roughnessFeedback: 0.34 }
};

const GOAL_GATE = 'gate-4e-br-vehicle-first-presentation-framing-pass';
const GATE4_C_B1_GATE_ID = 'gate-4c-b1-south-run-replacements';
const GATE4_C_B2_GATE_ID = 'gate-4c-b2-gallery-side-replacements';
const GATE4_C_B3_GATE_ID = 'gate-4c-b3-west-service-replacements';
const GATE4_C_B4_GATE_ID = 'gate-4c-b4-signal-harbor-replacement';
const GATE4_C_B5_GATE_ID = 'gate-4c-b5-north-ridge-replacements';
const GATE4_C_B6_GATE_ID = 'gate-4c-b6-todo-planning-studio';
const GATE4_C_GATE_IDS = [GATE4_C_B1_GATE_ID, GATE4_C_B2_GATE_ID, GATE4_C_B3_GATE_ID, GATE4_C_B4_GATE_ID, GATE4_C_B5_GATE_ID, GATE4_C_B6_GATE_ID];
const GATE4_D_B1_GATE_ID = 'gate-4d-b1-career-awards-architecture';
const GATE4_D_B2_GATE_ID = 'gate-4d-b2-projects-cv-architecture';
const GATE4_D_B3_GATE_ID = 'gate-4d-b3-skills-behind-architecture';
const GATE4_D_B4_GATE_ID = 'gate-4d-b4-harbor-todo-architecture';
const GATE4_D_B5_GATE_ID = 'gate-4d-b5-potato-sentinel-circuit-architecture';
const GATE4_D_B6_GATE_ID = 'gate-4d-b6-data-pier-compatibility-review';
const GATE4_D_D_GATE_ID = 'gate-4d-d-life-interaction-pass';
const GATE4_E_C_GATE_ID = 'gate-4e-c-monumental-scale-pass';
const GATE4_E_D_GATE_ID = 'gate-4e-d-site-integration-life-pass';
const GATE4_E_F_GATE_ID = 'gate-4e-f-route-composition-pass';
const GATE4_E_G_GATE_ID = 'gate-4e-g-cybersecurity-craft-pass';
const GATE4_E_H_GATE_ID = 'gate-4e-h-projects-foundry-readability-pass';
const GATE4_E_I_GATE_ID = 'gate-4e-i-behind-engineering-scale-pass';
const GATE4_E_J_GATE_ID = 'gate-4e-j-signal-harbor-broadcast-pass';
const GATE4_E_K_GATE_ID = 'gate-4e-k-circuit-time-trial-readability-pass';
const GATE4_E_L_GATE_ID = 'gate-4e-l-potato-greenhouse-readability-pass';
const GATE4_E_M_GATE_ID = 'gate-4e-m-protected-fcc-visibility-pass';
const GATE4_E_N_GATE_ID = 'gate-4e-n-sentinel-soc-silhouette-pass';
const GATE4_E_O_GATE_ID = 'gate-4e-o-security-operations-readability-pass';
const GATE4_E_P_GATE_ID = 'gate-4e-p-skills-data-center-readability-pass';
const GATE4_E_Q_GATE_ID = 'gate-4e-q-cv-records-archive-readability-pass';
const GATE4_E_R_GATE_ID = 'gate-4e-r-career-software-campus-readability-pass';
const GATE4_E_S_GATE_ID = 'gate-4e-s-circuit-race-control-readability-pass';
const GATE4_E_T_GATE_ID = 'gate-4e-t-todo-planning-studio-readability-pass';
const GATE4_E_U_GATE_ID = 'gate-4e-u-signal-harbor-public-contact-readability-pass';
const GATE4_E_V_GATE_ID = 'gate-4e-v-projects-public-build-readability-pass';
const GATE4_E_W_GATE_ID = 'gate-4e-w-route-cohesion-approach-life-pass';
const GATE4_E_X_GATE_ID = 'gate-4e-x-site-ground-craft-pass';
const GATE4_E_Y_GATE_ID = 'gate-4e-y-launch-hub-composition-pass';
const GATE4_E_Z_GATE_ID = 'gate-4e-z-sentinel-solid-soc-readability-pass';
const GATE4_E_AA_GATE_ID = 'gate-4e-aa-skills-learning-systems-readability-pass';
const GATE4_E_AB_GATE_ID = 'gate-4e-ab-signal-harbor-contact-gateway-pass';
const GATE4_E_AC_GATE_ID = 'gate-4e-ac-todo-production-control-studio-pass';
const GATE4_E_AD_GATE_ID = 'gate-4e-ad-potato-greenhouse-farm-court-pass';
const GATE4_E_AE_GATE_ID = 'gate-4e-ae-security-operations-campus-scale-pass';
const GATE4_E_AF_GATE_ID = 'gate-4e-af-sentinel-soc-command-campus-pass';
const GATE4_E_AG_GATE_ID = 'gate-4e-ag-career-campus-frontage-pass';
const GATE4_E_AH_GATE_ID = 'gate-4e-ah-potato-greenhouse-frontage-pass';
const GATE4_E_AI_GATE_ID = 'gate-4e-ai-projects-foundry-route-build-hall-pass';
const GATE4_E_AJ_GATE_ID = 'gate-4e-aj-behind-engineering-route-prototype-bay-pass';
const GATE4_E_AK_GATE_ID = 'gate-4e-ak-awards-museum-trophy-atrium-pass';
const GATE4_E_AL_GATE_ID = 'gate-4e-al-sentinel-route-command-facade-pass';
const GATE4_E_AM_GATE_ID = 'gate-4e-am-skills-learning-stack-route-atrium-pass';
const GATE4_E_AN_GATE_ID = 'gate-4e-an-cv-records-vault-route-archive-pass';
const GATE4_E_AO_GATE_ID = 'gate-4e-ao-todo-operations-core-route-read-pass';
const GATE4_E_AP_GATE_ID = 'gate-4e-ap-behind-inner-build-cell-route-read-pass';
const GATE4_E_AQ_GATE_ID = 'gate-4e-aq-security-access-control-threshold-pass';
const GATE4_E_AR_GATE_ID = 'gate-4e-ar-career-software-campus-route-entry-pass';
const GATE4_E_AS_GATE_ID = 'gate-4e-as-skills-learning-campus-route-curriculum-pass';
const GATE4_E_AT_GATE_ID = 'gate-4e-at-projects-build-theater-route-read-pass';
const GATE4_E_AU_GATE_ID = 'gate-4e-au-sentinel-soc-campus-entry-route-read-pass';
const GATE4_E_AV_GATE_ID = 'gate-4e-av-behind-build-process-atrium-route-read-pass';
const GATE4_E_AW_GATE_ID = 'gate-4e-aw-career-campus-arrival-court-route-read-pass';
const GATE4_E_AX_GATE_ID = 'gate-4e-ax-skills-learning-campus-route-court-pass';
const GATE4_E_AY_GATE_ID = 'gate-4e-ay-projects-public-showcase-route-theater-pass';
const GATE4_E_AZ_GATE_ID = 'gate-4e-az-security-operations-threshold-route-facade-pass';
const GATE4_E_BA_GATE_ID = 'gate-4e-ba-launch-hub-arrival-portal-pass';
const GATE4_E_BB_GATE_ID = 'gate-4e-bb-career-campus-forecourt-route-read-pass';
const GATE4_E_BC_GATE_ID = 'gate-4e-bc-signal-harbor-contact-exchange-route-gateway-pass';
const GATE4_E_BD_GATE_ID = 'gate-4e-bd-circuit-race-control-route-tunnel-pass';
const GATE4_E_BE_GATE_ID = 'gate-4e-be-primary-landmark-quality-visibility-pass';
const GATE4_E_BF_GATE_ID = 'gate-4e-bf-primary-route-discovery-visibility-pass';
const GATE4_E_BG_GATE_ID = 'gate-4e-bg-sentinel-soc-route-threshold-pass';
const GATE4_E_BH_GATE_ID = 'gate-4e-bh-career-software-campus-drive-by-arrival-pass';
const GATE4_E_BI_GATE_ID = 'gate-4e-bi-todo-production-control-drive-by-threshold-pass';
const GATE4_E_BJ_GATE_ID = 'gate-4e-bj-behind-engineering-drive-by-build-portal-pass';
const GATE4_E_BK_GATE_ID = 'gate-4e-bk-contact-signal-exchange-drive-by-gateway-pass';
const GATE4_E_BL_GATE_ID = 'gate-4e-bl-awards-honors-boulevard-pass';
const GATE4_E_BM_GATE_ID = 'gate-4e-bm-security-operations-campus-arrival-pass';
const GATE4_E_BN_GATE_ID = 'gate-4e-bn-projects-release-foundry-drive-by-pass';
const GATE4_E_BO_GATE_ID = 'gate-4e-bo-career-campus-route-framing-pass';
const GATE4_E_BP_GATE_ID = 'gate-4e-bp-contact-vehicle-first-framing-pass';
const GATE4_E_BQ_GATE_ID = 'gate-4e-bq-potato-harvest-court-vehicle-first-pass';
const GATE4_E_BR_GATE_ID = 'gate-4e-br-vehicle-first-presentation-framing-pass';
const GATE4_D_GATE_IDS = [GATE4_D_B1_GATE_ID, GATE4_D_B2_GATE_ID, GATE4_D_B3_GATE_ID, GATE4_D_B4_GATE_ID, GATE4_D_B5_GATE_ID, GATE4_D_B6_GATE_ID, GATE4_D_D_GATE_ID, GATE4_E_C_GATE_ID, GATE4_E_D_GATE_ID, GATE4_E_F_GATE_ID, GATE4_E_G_GATE_ID, GATE4_E_H_GATE_ID, GATE4_E_I_GATE_ID, GATE4_E_J_GATE_ID, GATE4_E_K_GATE_ID, GATE4_E_L_GATE_ID, GATE4_E_M_GATE_ID, GATE4_E_N_GATE_ID, GATE4_E_O_GATE_ID, GATE4_E_P_GATE_ID, GATE4_E_Q_GATE_ID, GATE4_E_R_GATE_ID, GATE4_E_S_GATE_ID, GATE4_E_T_GATE_ID, GATE4_E_U_GATE_ID, GATE4_E_V_GATE_ID, GATE4_E_W_GATE_ID, GATE4_E_X_GATE_ID, GATE4_E_Y_GATE_ID, GATE4_E_Z_GATE_ID, GATE4_E_AA_GATE_ID, GATE4_E_AB_GATE_ID, GATE4_E_AC_GATE_ID, GATE4_E_AD_GATE_ID, GATE4_E_AE_GATE_ID, GATE4_E_AF_GATE_ID, GATE4_E_AG_GATE_ID, GATE4_E_AH_GATE_ID, GATE4_E_AI_GATE_ID, GATE4_E_AJ_GATE_ID, GATE4_E_AK_GATE_ID, GATE4_E_AL_GATE_ID, GATE4_E_AM_GATE_ID, GATE4_E_AN_GATE_ID, GATE4_E_AO_GATE_ID, GATE4_E_AP_GATE_ID, GATE4_E_AQ_GATE_ID, GATE4_E_AR_GATE_ID, GATE4_E_AS_GATE_ID, GATE4_E_AT_GATE_ID, GATE4_E_AU_GATE_ID, GATE4_E_AV_GATE_ID, GATE4_E_AW_GATE_ID, GATE4_E_AX_GATE_ID, GATE4_E_AY_GATE_ID, GATE4_E_AZ_GATE_ID, GATE4_E_BA_GATE_ID, GATE4_E_BB_GATE_ID, GATE4_E_BC_GATE_ID, GATE4_E_BD_GATE_ID, GATE4_E_BE_GATE_ID, GATE4_E_BF_GATE_ID, GATE4_E_BG_GATE_ID, GATE4_E_BH_GATE_ID, GATE4_E_BI_GATE_ID, GATE4_E_BJ_GATE_ID, GATE4_E_BK_GATE_ID, GATE4_E_BL_GATE_ID, GATE4_E_BM_GATE_ID, GATE4_E_BN_GATE_ID, GATE4_E_BO_GATE_ID, GATE4_E_BP_GATE_ID, GATE4_E_BQ_GATE_ID, GATE4_E_BR_GATE_ID];
const GATE4_BR_GATE_ID = 'gate-4br-composition-correction';
const GATE4_B1_GATE_IDS = new Set(['gate-4b1-south-run', 'gate-4b2-west-service', 'gate-4b3-data-pier-side', 'gate-4b4-east-side', 'gate-4b5-north-ridge', GATE4_BR_GATE_ID, ...GATE4_C_GATE_IDS, ...GATE4_D_GATE_IDS]);
const GATE4_B2_GATE_IDS = new Set(['gate-4b2-west-service', 'gate-4b3-data-pier-side', 'gate-4b4-east-side', 'gate-4b5-north-ridge', GATE4_BR_GATE_ID, ...GATE4_C_GATE_IDS, ...GATE4_D_GATE_IDS]);
const GATE4_B3_GATE_IDS = new Set(['gate-4b3-data-pier-side', 'gate-4b4-east-side', 'gate-4b5-north-ridge', GATE4_BR_GATE_ID, ...GATE4_C_GATE_IDS, ...GATE4_D_GATE_IDS]);
const GATE4_B4_GATE_IDS = new Set(['gate-4b4-east-side', 'gate-4b5-north-ridge', GATE4_BR_GATE_ID, ...GATE4_C_GATE_IDS, ...GATE4_D_GATE_IDS]);
const GATE4_B5_GATE_IDS = new Set(['gate-4b5-north-ridge', GATE4_BR_GATE_ID, ...GATE4_C_GATE_IDS, ...GATE4_D_GATE_IDS]);
const FOUNDATION_GATE_IDS = new Set(['gate-2r-foundation-replacement', 'gate-3r-vertical-slice', ...GATE4_B1_GATE_IDS]);
const VERTICAL_SLICE_GATE_IDS = new Set(['gate-3-vertical-slice', 'gate-3r-vertical-slice', ...GATE4_B1_GATE_IDS]);

export class World {
  constructor({ scene, physics, resumeData, environmentAssets }) {
    this.scene = scene;
    this.physics = physics;
    this.resumeData = resumeData;
    this.environmentAssets = environmentAssets;
    this.goalGate = GOAL_GATE;
    this.verticalSliceMode = VERTICAL_SLICE_GATE_IDS.has(GOAL_GATE);
    this.foundationReplacementMode = FOUNDATION_GATE_IDS.has(GOAL_GATE);
    this.gate3rMode = GOAL_GATE === 'gate-3r-vertical-slice';
    this.gate4b1Mode = GATE4_B1_GATE_IDS.has(GOAL_GATE);
    this.gate4b2Mode = GATE4_B2_GATE_IDS.has(GOAL_GATE);
    this.gate4b3Mode = GATE4_B3_GATE_IDS.has(GOAL_GATE);
    this.gate4b4Mode = GATE4_B4_GATE_IDS.has(GOAL_GATE);
    this.gate4b5Mode = GATE4_B5_GATE_IDS.has(GOAL_GATE);
    this.gate4b6Mode = false;
    this.gate4b6rPrototypeMode = false;
    this.gate4b6rFullMode = false;
    this.gate4dLifeMode = GOAL_GATE === GATE4_D_D_GATE_ID || GOAL_GATE === GATE4_E_C_GATE_ID || GOAL_GATE === GATE4_E_D_GATE_ID || GOAL_GATE === GATE4_E_F_GATE_ID || GOAL_GATE === GATE4_E_G_GATE_ID || GOAL_GATE === GATE4_E_H_GATE_ID || GOAL_GATE === GATE4_E_I_GATE_ID || GOAL_GATE === GATE4_E_J_GATE_ID || GOAL_GATE === GATE4_E_K_GATE_ID || GOAL_GATE === GATE4_E_L_GATE_ID || GOAL_GATE === GATE4_E_M_GATE_ID || GOAL_GATE === GATE4_E_N_GATE_ID || GOAL_GATE === GATE4_E_O_GATE_ID || GOAL_GATE === GATE4_E_P_GATE_ID || GOAL_GATE === GATE4_E_Q_GATE_ID || GOAL_GATE === GATE4_E_R_GATE_ID || GOAL_GATE === GATE4_E_S_GATE_ID || GOAL_GATE === GATE4_E_T_GATE_ID || GOAL_GATE === GATE4_E_U_GATE_ID || GOAL_GATE === GATE4_E_V_GATE_ID || GOAL_GATE === GATE4_E_W_GATE_ID || GOAL_GATE === GATE4_E_X_GATE_ID || GOAL_GATE === GATE4_E_Y_GATE_ID || GOAL_GATE === GATE4_E_Z_GATE_ID || GOAL_GATE === GATE4_E_AA_GATE_ID || GOAL_GATE === GATE4_E_AB_GATE_ID || GOAL_GATE === GATE4_E_AC_GATE_ID || GOAL_GATE === GATE4_E_AD_GATE_ID || GOAL_GATE === GATE4_E_AE_GATE_ID || GOAL_GATE === GATE4_E_AF_GATE_ID || GOAL_GATE === GATE4_E_AG_GATE_ID || GOAL_GATE === GATE4_E_AH_GATE_ID || GOAL_GATE === GATE4_E_AI_GATE_ID || GOAL_GATE === GATE4_E_AJ_GATE_ID || GOAL_GATE === GATE4_E_AK_GATE_ID || GOAL_GATE === GATE4_E_AL_GATE_ID || GOAL_GATE === GATE4_E_AM_GATE_ID || GOAL_GATE === GATE4_E_AN_GATE_ID || GOAL_GATE === GATE4_E_AO_GATE_ID || GOAL_GATE === GATE4_E_AP_GATE_ID || GOAL_GATE === GATE4_E_AQ_GATE_ID || GOAL_GATE === GATE4_E_AR_GATE_ID || GOAL_GATE === GATE4_E_AS_GATE_ID || GOAL_GATE === GATE4_E_AT_GATE_ID || GOAL_GATE === GATE4_E_AU_GATE_ID;
    this.gate4eRouteCompositionMode = GOAL_GATE === GATE4_E_F_GATE_ID || GOAL_GATE === GATE4_E_G_GATE_ID || GOAL_GATE === GATE4_E_H_GATE_ID || GOAL_GATE === GATE4_E_I_GATE_ID || GOAL_GATE === GATE4_E_J_GATE_ID || GOAL_GATE === GATE4_E_K_GATE_ID || GOAL_GATE === GATE4_E_L_GATE_ID || GOAL_GATE === GATE4_E_M_GATE_ID || GOAL_GATE === GATE4_E_N_GATE_ID || GOAL_GATE === GATE4_E_O_GATE_ID || GOAL_GATE === GATE4_E_P_GATE_ID || GOAL_GATE === GATE4_E_Q_GATE_ID || GOAL_GATE === GATE4_E_R_GATE_ID || GOAL_GATE === GATE4_E_S_GATE_ID || GOAL_GATE === GATE4_E_T_GATE_ID || GOAL_GATE === GATE4_E_U_GATE_ID || GOAL_GATE === GATE4_E_V_GATE_ID || GOAL_GATE === GATE4_E_W_GATE_ID || GOAL_GATE === GATE4_E_X_GATE_ID || GOAL_GATE === GATE4_E_Y_GATE_ID || GOAL_GATE === GATE4_E_Z_GATE_ID || GOAL_GATE === GATE4_E_AA_GATE_ID || GOAL_GATE === GATE4_E_AB_GATE_ID || GOAL_GATE === GATE4_E_AC_GATE_ID || GOAL_GATE === GATE4_E_AD_GATE_ID || GOAL_GATE === GATE4_E_AE_GATE_ID || GOAL_GATE === GATE4_E_AF_GATE_ID || GOAL_GATE === GATE4_E_AG_GATE_ID || GOAL_GATE === GATE4_E_AH_GATE_ID || GOAL_GATE === GATE4_E_AI_GATE_ID || GOAL_GATE === GATE4_E_AJ_GATE_ID || GOAL_GATE === GATE4_E_AK_GATE_ID || GOAL_GATE === GATE4_E_AL_GATE_ID || GOAL_GATE === GATE4_E_AM_GATE_ID || GOAL_GATE === GATE4_E_AN_GATE_ID || GOAL_GATE === GATE4_E_AO_GATE_ID || GOAL_GATE === GATE4_E_AP_GATE_ID || GOAL_GATE === GATE4_E_AQ_GATE_ID || GOAL_GATE === GATE4_E_AR_GATE_ID || GOAL_GATE === GATE4_E_AS_GATE_ID || GOAL_GATE === GATE4_E_AT_GATE_ID || GOAL_GATE === GATE4_E_AU_GATE_ID;
    this.gate4eCybersecurityCraftMode = GOAL_GATE === GATE4_E_G_GATE_ID || GOAL_GATE === GATE4_E_H_GATE_ID || GOAL_GATE === GATE4_E_I_GATE_ID || GOAL_GATE === GATE4_E_J_GATE_ID || GOAL_GATE === GATE4_E_K_GATE_ID || GOAL_GATE === GATE4_E_L_GATE_ID || GOAL_GATE === GATE4_E_M_GATE_ID || GOAL_GATE === GATE4_E_N_GATE_ID || GOAL_GATE === GATE4_E_O_GATE_ID || GOAL_GATE === GATE4_E_P_GATE_ID || GOAL_GATE === GATE4_E_Q_GATE_ID || GOAL_GATE === GATE4_E_R_GATE_ID || GOAL_GATE === GATE4_E_S_GATE_ID || GOAL_GATE === GATE4_E_T_GATE_ID || GOAL_GATE === GATE4_E_U_GATE_ID || GOAL_GATE === GATE4_E_V_GATE_ID || GOAL_GATE === GATE4_E_W_GATE_ID || GOAL_GATE === GATE4_E_X_GATE_ID || GOAL_GATE === GATE4_E_Y_GATE_ID || GOAL_GATE === GATE4_E_Z_GATE_ID || GOAL_GATE === GATE4_E_AA_GATE_ID || GOAL_GATE === GATE4_E_AB_GATE_ID || GOAL_GATE === GATE4_E_AC_GATE_ID || GOAL_GATE === GATE4_E_AD_GATE_ID || GOAL_GATE === GATE4_E_AE_GATE_ID || GOAL_GATE === GATE4_E_AF_GATE_ID || GOAL_GATE === GATE4_E_AG_GATE_ID || GOAL_GATE === GATE4_E_AH_GATE_ID || GOAL_GATE === GATE4_E_AI_GATE_ID || GOAL_GATE === GATE4_E_AJ_GATE_ID || GOAL_GATE === GATE4_E_AK_GATE_ID || GOAL_GATE === GATE4_E_AL_GATE_ID || GOAL_GATE === GATE4_E_AM_GATE_ID || GOAL_GATE === GATE4_E_AN_GATE_ID || GOAL_GATE === GATE4_E_AO_GATE_ID || GOAL_GATE === GATE4_E_AP_GATE_ID || GOAL_GATE === GATE4_E_AQ_GATE_ID || GOAL_GATE === GATE4_E_AR_GATE_ID || GOAL_GATE === GATE4_E_AS_GATE_ID || GOAL_GATE === GATE4_E_AT_GATE_ID || GOAL_GATE === GATE4_E_AU_GATE_ID;
    this.gate4eSiteGroundCraftMode = GOAL_GATE === GATE4_E_X_GATE_ID || GOAL_GATE === GATE4_E_Y_GATE_ID || GOAL_GATE === GATE4_E_Z_GATE_ID || GOAL_GATE === GATE4_E_AA_GATE_ID || GOAL_GATE === GATE4_E_AB_GATE_ID || GOAL_GATE === GATE4_E_AC_GATE_ID || GOAL_GATE === GATE4_E_AD_GATE_ID || GOAL_GATE === GATE4_E_AE_GATE_ID || GOAL_GATE === GATE4_E_AF_GATE_ID || GOAL_GATE === GATE4_E_AG_GATE_ID || GOAL_GATE === GATE4_E_AH_GATE_ID || GOAL_GATE === GATE4_E_AI_GATE_ID || GOAL_GATE === GATE4_E_AJ_GATE_ID || GOAL_GATE === GATE4_E_AK_GATE_ID || GOAL_GATE === GATE4_E_AL_GATE_ID || GOAL_GATE === GATE4_E_AM_GATE_ID || GOAL_GATE === GATE4_E_AN_GATE_ID || GOAL_GATE === GATE4_E_AO_GATE_ID || GOAL_GATE === GATE4_E_AP_GATE_ID || GOAL_GATE === GATE4_E_AQ_GATE_ID || GOAL_GATE === GATE4_E_AR_GATE_ID || GOAL_GATE === GATE4_E_AS_GATE_ID || GOAL_GATE === GATE4_E_AT_GATE_ID || GOAL_GATE === GATE4_E_AU_GATE_ID;
    this.gate4eLaunchHubMode = GOAL_GATE === GATE4_E_Y_GATE_ID || GOAL_GATE === GATE4_E_Z_GATE_ID || GOAL_GATE === GATE4_E_AA_GATE_ID || GOAL_GATE === GATE4_E_AB_GATE_ID || GOAL_GATE === GATE4_E_AC_GATE_ID || GOAL_GATE === GATE4_E_AD_GATE_ID || GOAL_GATE === GATE4_E_AE_GATE_ID || GOAL_GATE === GATE4_E_AF_GATE_ID || GOAL_GATE === GATE4_E_AG_GATE_ID || GOAL_GATE === GATE4_E_AH_GATE_ID || GOAL_GATE === GATE4_E_AI_GATE_ID || GOAL_GATE === GATE4_E_AJ_GATE_ID || GOAL_GATE === GATE4_E_AK_GATE_ID || GOAL_GATE === GATE4_E_AL_GATE_ID || GOAL_GATE === GATE4_E_AM_GATE_ID || GOAL_GATE === GATE4_E_AN_GATE_ID || GOAL_GATE === GATE4_E_AO_GATE_ID || GOAL_GATE === GATE4_E_AP_GATE_ID || GOAL_GATE === GATE4_E_AQ_GATE_ID || GOAL_GATE === GATE4_E_AR_GATE_ID || GOAL_GATE === GATE4_E_AS_GATE_ID || GOAL_GATE === GATE4_E_AT_GATE_ID || GOAL_GATE === GATE4_E_AU_GATE_ID;
    this.gate4ePrimaryRouteDiscoveryMode = GOAL_GATE === GATE4_E_BF_GATE_ID || GOAL_GATE === GATE4_E_BG_GATE_ID || GOAL_GATE === GATE4_E_BH_GATE_ID || GOAL_GATE === GATE4_E_BI_GATE_ID || GOAL_GATE === GATE4_E_BJ_GATE_ID || GOAL_GATE === GATE4_E_BK_GATE_ID || GOAL_GATE === GATE4_E_BL_GATE_ID || GOAL_GATE === GATE4_E_BM_GATE_ID || GOAL_GATE === GATE4_E_BN_GATE_ID || GOAL_GATE === GATE4_E_BO_GATE_ID || GOAL_GATE === GATE4_E_BP_GATE_ID || GOAL_GATE === GATE4_E_BQ_GATE_ID || GOAL_GATE === GATE4_E_BR_GATE_ID;
    if (GOAL_GATE === GATE4_E_AV_GATE_ID || GOAL_GATE === GATE4_E_AW_GATE_ID || GOAL_GATE === GATE4_E_AX_GATE_ID || GOAL_GATE === GATE4_E_AY_GATE_ID || GOAL_GATE === GATE4_E_AZ_GATE_ID || GOAL_GATE === GATE4_E_BA_GATE_ID || GOAL_GATE === GATE4_E_BB_GATE_ID || GOAL_GATE === GATE4_E_BC_GATE_ID || GOAL_GATE === GATE4_E_BD_GATE_ID || GOAL_GATE === GATE4_E_BE_GATE_ID || GOAL_GATE === GATE4_E_BF_GATE_ID || GOAL_GATE === GATE4_E_BG_GATE_ID || GOAL_GATE === GATE4_E_BH_GATE_ID || GOAL_GATE === GATE4_E_BI_GATE_ID || GOAL_GATE === GATE4_E_BJ_GATE_ID || GOAL_GATE === GATE4_E_BK_GATE_ID || GOAL_GATE === GATE4_E_BL_GATE_ID || GOAL_GATE === GATE4_E_BM_GATE_ID || GOAL_GATE === GATE4_E_BN_GATE_ID || GOAL_GATE === GATE4_E_BO_GATE_ID || GOAL_GATE === GATE4_E_BP_GATE_ID || GOAL_GATE === GATE4_E_BQ_GATE_ID || GOAL_GATE === GATE4_E_BR_GATE_ID) {
      this.gate4dLifeMode = true;
      this.gate4eRouteCompositionMode = true;
      this.gate4eCybersecurityCraftMode = true;
      this.gate4eSiteGroundCraftMode = true;
      this.gate4eLaunchHubMode = true;
    }
    this.blockoutMode = GOAL_GATE === 'gate-2-blockout' || this.verticalSliceMode || this.foundationReplacementMode;
    this.materials = createWorldMaterials();
    this.zones = [];
    this.decor = [];
    this.boostPads = [];
    this.ramps = [];
    this.collectibles = [];
    this.collectibleDummy = new THREE.Object3D();
    this.collectibleRingMesh = null;
    this.collectibleBeamMesh = null;
    this.potatoes = [];
    this.surfaceState = { label: 'land', inWater: false, nearShore: false };
    this.roadSegments = roadSegments;
    this.checkpoints = circuitCheckpoints.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    this.landscapeQuality = this.readLandscapeQuality();
    this.circuit = {
      active: false,
      startedAt: 0,
      checkpoint: 0,
      checkpointEvents: 0,
      lastCheckpointAt: 0,
      lastCheckpointIndex: 0,
      lastCheckpointTime: 0,
      checkpointPulse: 0,
      finishedCount: 0,
      lastLap: 0,
      summaryUntil: 0,
      best: Number(localStorage.getItem('portfolio-drive-best-lap') || 0)
    };
    this.securityScan = {
      active: false,
      complete: false,
      startedAt: 0
    };

    this.build();
  }

  build() {
    this.terrain = new Terrain(this);
    this.water = new Water(this);
    this.roads = new Roads(this);
    this.zonesSystem = new Zones(this);
    this.setPieces = new SetPieces(this);
    this.props = this.blockoutMode ? null : new Props(this);
    this.foliage = this.blockoutMode ? null : new Foliage(this);
    this.potatoFarm = this.blockoutMode ? null : new PotatoFarm(this);
    this.atmosphere = new Atmosphere(this);

    this.terrain.build();
    this.water.build();
    this.roads.build();
    this.zonesSystem.build();
    this.setPieces.build();
    this.potatoFarm?.build();
    this.props?.build();
    this.foliage?.build();
    this.createCollectibles();
    this.atmosphere.build();
  }

  cloneEnvironmentAsset(name) {
    return this.environmentAssets?.clone?.(name) || null;
  }

  readLandscapeQuality() {
    const saved = localStorage.getItem('portfolio-drive-landscape-quality');
    const lightLandscape = prefersLightLandscape();
    if (QUALITY_PROFILES[saved]) return saved;
    return lightLandscape ? 'low' : 'medium';
  }

  getQualityProfile() {
    return QUALITY_PROFILES[this.landscapeQuality] || QUALITY_PROFILES.medium;
  }

  setLandscapeQuality(quality) {
    if (!QUALITY_PROFILES[quality]) return this.landscapeQuality;
    this.landscapeQuality = quality;
    localStorage.setItem('portfolio-drive-landscape-quality', quality);
    this.terrain?.applyQuality?.();
    this.water?.applyQuality?.();
    this.roads?.applyQuality?.();
    this.foliage?.applyQuality?.();
    this.setPieces?.applyQuality?.();
    this.atmosphere?.applyQuality?.();
    this.onQualityChange?.(quality);
    return this.landscapeQuality;
  }

  cycleLandscapeQuality() {
    const current = QUALITY_ORDER.indexOf(this.landscapeQuality);
    return this.setLandscapeQuality(QUALITY_ORDER[(current + 1) % QUALITY_ORDER.length]);
  }

  isClearForProp(x, z, radius = 2) {
    if (!this.terrain?.containsPoint(x, z, radius + 6)) return false;
    if (this.roads?.isNear(x, z, radius + 1.0)) return false;
    for (const zone of worldZones) {
      const dx = x - zone.position[0];
      const dz = z - zone.position[2];
      if (Math.hypot(dx, dz) < zone.radius + radius + 5) return false;
    }
    return true;
  }

  createCollectibles() {
    if (this.foundationReplacementMode) return;

    const points = [
      [-62, 0, 68],
      [28, 0, 96],
      [96, 0, -18],
      [-84, 0, -54],
      [18, 0, -112],
      [120, 0, 58],
      [-24, 0, 34]
    ];
    const shardGeometry = new THREE.OctahedronGeometry(1.32, 0);
    const shardMaterial = new THREE.MeshStandardMaterial({ color: 0x79ffc5, emissive: 0x0d6d4f, emissiveIntensity: 1.45, roughness: 0.24, metalness: 0.12 });
    this.collectibleRingMesh = new THREE.InstancedMesh(
      new THREE.RingGeometry(1.58, 1.92, 6),
      new THREE.MeshBasicMaterial({ color: 0x79ffc5, transparent: true, opacity: 0.42, side: THREE.DoubleSide, depthWrite: false }),
      points.length
    );
    this.collectibleRingMesh.name = 'Collectible_DataShard_Rings';
    this.collectibleRingMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.collectibleRingMesh);
    this.collectibleBeamMesh = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.075, 0.075, 3.2, 6),
      new THREE.MeshBasicMaterial({ color: 0x79ffc5, transparent: true, opacity: 0.32, depthWrite: false }),
      points.length
    );
    this.collectibleBeamMesh.name = 'Collectible_DataShard_Beams';
    this.collectibleBeamMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.collectibleBeamMesh);

    for (let i = 0; i < points.length; i += 1) {
      const mesh = new THREE.Mesh(shardGeometry, shardMaterial);
      mesh.name = `Collectible_DataShard_${i}`;
      mesh.position.set(points[i][0], 2.2, points[i][2]);
      this.scene.add(mesh);
      const item = { mesh, collected: localStorage.getItem(`portfolio-drive-shard-${i}`) === '1', index: i };
      this.collectibles.push(item);
      mesh.visible = !item.collected;
      this.writeCollectibleVisual(item, 0);
    }
    this.collectibleRingMesh.instanceMatrix.needsUpdate = true;
    this.collectibleBeamMesh.instanceMatrix.needsUpdate = true;
  }

  checkBoostPad(position) {
    return this.boostPads.find((pad) => position.distanceTo(pad.position) < 4.2) || null;
  }

  checkRampAir(position, yVelocity) {
    if (yVelocity < 3.2) return false;
    for (const ramp of this.ramps) {
      const near = position.distanceTo(ramp.position) < ramp.radius;
      if (near && !ramp.triggered) {
        ramp.triggered = true;
        window.setTimeout(() => { ramp.triggered = false; }, 1000);
        return true;
      }
    }
    return false;
  }

  checkCollectibles(position) {
    const collected = [];
    for (const item of this.collectibles) {
      if (item.collected || position.distanceTo(item.mesh.position) > 3.4) continue;
      item.collected = true;
      item.mesh.visible = false;
      localStorage.setItem(`portfolio-drive-shard-${item.index}`, '1');
      this.writeCollectibleVisual(item, 0);
      collected.push(item);
    }
    if (collected.length) this.refreshCollectibleVisuals();
    return collected;
  }

  getCollectedCount() {
    return this.collectibles.filter((item) => item.collected).length;
  }

  getCollectibleStats() {
    const total = this.collectibles.length;
    const collected = this.getCollectedCount();
    return {
      total,
      collected,
      visibleShards: this.collectibles.filter((item) => item.mesh.visible).length,
      visibleRings: total - collected,
      ringInstances: this.collectibleRingMesh?.count || 0,
      beamInstances: this.collectibleBeamMesh?.count || 0
    };
  }

  refreshCollectibleVisuals(elapsed = 0) {
    for (const item of this.collectibles) this.writeCollectibleVisual(item, elapsed);
    if (this.collectibleRingMesh) this.collectibleRingMesh.instanceMatrix.needsUpdate = true;
    if (this.collectibleBeamMesh) this.collectibleBeamMesh.instanceMatrix.needsUpdate = true;
  }

  setPotatoCount(count) {
    this.potatoFarm?.setPotatoCount(count);
  }

  spawnPotato() {
    return this.potatoFarm?.spawnPotato();
  }

  nearestZone(position) {
    let best = null;
    for (const zone of this.zones) {
      const distance = position.distanceTo(zone.position);
      if (distance <= zone.radius + 4 && (!best || distance < best.distance)) {
        best = { zone, distance };
      }
    }
    return best;
  }

  nearestWhisper(position) {
    return this.setPieces?.getNearestWhisper?.(position) || null;
  }

  getRespawnPose(zoneId = 'landing') {
    const zone = this.zones.find((item) => item.id === zoneId) || this.zones.find((item) => item.id === 'landing');
    if (!zone) {
      return { position: new THREE.Vector3(4, 1.45, 26), heading: 0 };
    }
    const authored = zonePresentation[zone.id]?.respawn;
    if (authored?.position) {
      return {
        position: vectorFromArray(authored.position),
        heading: authored.heading ?? zone.rotation ?? 0
      };
    }
    if (authored?.offset) {
      return {
        position: zone.position.clone().add(vectorFromArray(authored.offset)),
        heading: authored.heading ?? zone.rotation ?? 0
      };
    }
    if (zone.id === 'landing') {
      return { position: zone.position.clone().add(new THREE.Vector3(4, 1.08, -16)), heading: 0.15 };
    }
    const distance = zone.id === 'education' ? 18 : zone.id === 'security' ? 15 : 10;
    const offset = new THREE.Vector3(Math.sin(zone.rotation || 0) * -distance, 1.08, Math.cos(zone.rotation || 0) * -distance);
    return {
      position: zone.position.clone().add(offset),
      heading: zone.rotation || 0
    };
  }

  getPresentationPose(zoneId = 'landing') {
    const zone = this.zones.find((item) => item.id === zoneId) || this.zones.find((item) => item.id === 'landing');
    if (!zone) {
      return {
        position: new THREE.Vector3(7.5, 7.2, 9.5),
        target: new THREE.Vector3(0, 2.4, 0),
        fov: 42
      };
    }
    const authored = zonePresentation[zone.id] || {};
    const position = authored.camera
      ? vectorFromArray(authored.camera)
      : zone.position.clone().add(new THREE.Vector3(7.5, 7.2, 9.5));
    const target = authored.target
      ? vectorFromArray(authored.target)
      : zone.position.clone().add(new THREE.Vector3(0, 2.4, 0));
    return {
      position,
      target,
      fov: authored.fov ?? 42
    };
  }

  getRespawnPosition(zoneId = 'landing') {
    return this.getRespawnPose(zoneId).position;
  }

  getSurfaceInfo(position) {
    if (!position) return SURFACES.road;
    const distance = Math.hypot(position.x, position.z);
    const inWater = distance > ISLAND_RADIUS * 1.012 || position.y < WATER_Y + 0.24;
    const roadPath = this.roads?.getSurfaceAt(position.x, position.z, 0.9);
    let surface = SURFACES.grass;
    if (inWater) {
      surface = SURFACES.water;
    } else if (roadPath) {
      surface = roadSurfaceForPath(roadPath);
    } else if (distance > ISLAND_RADIUS * 0.965) {
      surface = SURFACES.shore;
    } else if (distance > ISLAND_RADIUS * 0.88) {
      surface = SURFACES.sand;
    }
    this.surfaceState = {
      label: surface.label,
      inWater: surface.id === 'water',
      nearShore: surface.id === 'shore' || surface.id === 'sand',
      onRoad: Boolean(roadPath),
      roadId: roadPath?.id || null,
      roadHierarchy: roadPath?.hierarchy || null,
      audioId: surface.audioId || surface.id,
      effectId: surface.effectId || surface.id
    };
    return surface;
  }

  startCircuit(now) {
    this.circuit.active = true;
    this.circuit.startedAt = now;
    this.circuit.checkpoint = 0;
    this.circuit.checkpointEvents = 0;
    this.circuit.lastCheckpointAt = 0;
    this.circuit.lastCheckpointIndex = 0;
    this.circuit.lastCheckpointTime = 0;
    this.circuit.checkpointPulse = 0;
    this.circuit.lastLap = 0;
    this.circuit.summaryUntil = 0;
  }

  startSecurityScan(now) {
    if (this.securityScan.active) return false;
    this.securityScan.active = true;
    this.securityScan.startedAt = now;
    return true;
  }

  completeSecurityScan() {
    this.securityScan.active = false;
    this.securityScan.complete = true;
  }

  updateCircuit(position, now) {
    if (!this.circuit.active) return null;
    const target = this.checkpoints[this.circuit.checkpoint + 1];
    if (!target || position.distanceTo(target) > 10) return null;

    this.circuit.checkpoint += 1;
    this.circuit.checkpointEvents += 1;
    this.circuit.lastCheckpointAt = now;
    this.circuit.lastCheckpointIndex = this.circuit.checkpoint;
    this.circuit.lastCheckpointTime = now - this.circuit.startedAt;
    this.circuit.checkpointPulse = 1;
    if (this.circuit.checkpoint >= this.checkpoints.length - 1) {
      const lap = now - this.circuit.startedAt;
      this.circuit.active = false;
      this.circuit.checkpoint = 0;
      this.circuit.finishedCount += 1;
      this.circuit.lastLap = lap;
      this.circuit.summaryUntil = now + 4;
      if (!this.circuit.best || lap < this.circuit.best) {
        this.circuit.best = lap;
        localStorage.setItem('portfolio-drive-best-lap', String(lap));
      }
      return { finished: true, lap };
    }
    return { checkpoint: this.circuit.checkpoint };
  }

  update(dt, elapsed, vehiclePosition, vehicle) {
    this.water?.update(dt, elapsed, vehiclePosition, vehicle);
    this.foliage?.update?.(dt, elapsed, vehiclePosition);
    this.potatoFarm?.update?.(dt, vehiclePosition);
    this.zonesSystem?.update?.(vehiclePosition);
    this.updateCircuitFeedback(dt);
    this.setPieces?.update?.(dt, elapsed, vehiclePosition);
    this.atmosphere?.update?.(dt, elapsed);
    this.updateCollectibles(dt, elapsed);
  }

  getBlockoutStats() {
    return {
      gate: this.goalGate,
      enabled: this.blockoutMode,
      densePropsBuilt: Boolean(this.props),
      denseFoliageBuilt: Boolean(this.foliage),
      potatoPocketBuilt: Boolean(this.potatoFarm?.group),
      setPieces: this.setPieces?.getBlockoutStats?.() || {},
      verticalSlice: this.setPieces?.getVerticalSliceStats?.() || {},
      terrain: {
        districtGround: this.terrain?.getDistrictGroundStats?.() || {},
        surfaceDetails: this.terrain?.surfaceDetailStats || {},
        meadowDetails: this.terrain?.getMeadowDetailStats?.() || {},
        fieldMotifs: this.terrain?.getFieldMotifStats?.() || {},
        relief: this.terrain?.getReliefStats?.() || {},
        shoreline: this.terrain?.getShorelineStats?.() || {}
      },
      roads: {
        details: this.roads?.getDetailStats?.() || {},
        guidanceChevrons: this.scene.getObjectByName('ROAD_Guidance_Chevrons')?.count || 0,
        reflectorStuds: this.scene.getObjectByName('ROAD_Reflector_Studs')?.count || 0,
        thresholdBars: this.roads?.roadGroup?.userData?.routeThresholdBars || 0
      }
    };
  }

  updateCircuitFeedback(dt) {
    if (this.circuit.checkpointPulse > 0) {
      this.circuit.checkpointPulse = Math.max(0, this.circuit.checkpointPulse - dt * 1.75);
    }
  }

  updateCollectibles(dt, elapsed) {
    for (const item of this.collectibles) {
      if (!item.collected) {
        item.mesh.rotation.y += dt * 1.1;
        item.mesh.position.y = 2.2 + Math.sin(elapsed * 1.6 + item.index) * 0.28;
      }
      this.writeCollectibleVisual(item, elapsed);
    }
    if (this.collectibleRingMesh) this.collectibleRingMesh.instanceMatrix.needsUpdate = true;
    if (this.collectibleBeamMesh) this.collectibleBeamMesh.instanceMatrix.needsUpdate = true;
  }

  writeCollectibleVisual(item, elapsed) {
    if (!this.collectibleRingMesh || !this.collectibleBeamMesh) return;
    const hidden = item.collected || !item.mesh.visible;
    if (hidden) {
      this.collectibleDummy.position.set(0, -1000, 0);
      this.collectibleDummy.rotation.set(0, 0, 0);
      this.collectibleDummy.scale.setScalar(0.001);
      this.collectibleDummy.updateMatrix();
      this.collectibleRingMesh.setMatrixAt(item.index, this.collectibleDummy.matrix);
      this.collectibleBeamMesh.setMatrixAt(item.index, this.collectibleDummy.matrix);
      return;
    }

    const pulse = 1 + Math.sin(elapsed * 1.7 + item.index * 0.7) * 0.16;
    this.collectibleDummy.position.set(item.mesh.position.x, 0.34, item.mesh.position.z);
    this.collectibleDummy.rotation.set(-Math.PI / 2, 0, elapsed * 0.62 + item.index * 0.48);
    this.collectibleDummy.scale.setScalar(pulse);
    this.collectibleDummy.updateMatrix();
    this.collectibleRingMesh.setMatrixAt(item.index, this.collectibleDummy.matrix);

    this.collectibleDummy.position.set(item.mesh.position.x, 1.5, item.mesh.position.z);
    this.collectibleDummy.rotation.set(0, 0, 0);
    this.collectibleDummy.scale.set(1, 0.9 + pulse * 0.2, 1);
    this.collectibleDummy.updateMatrix();
    this.collectibleBeamMesh.setMatrixAt(item.index, this.collectibleDummy.matrix);
  }
}

function prefersLightLandscape() {
  const narrow = window.innerWidth <= 760;
  const coarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches === true;
  const touch = navigator.maxTouchPoints > 1;
  return narrow || coarsePointer || touch;
}

function roadSurfaceForPath(path) {
  const profile = ROAD_SURFACES[path.hierarchy] || ROAD_SURFACES.street;
  return {
    ...SURFACES.road,
    ...profile,
    id: 'road',
    roadId: path.id,
    roadName: path.name,
    roadHierarchy: path.hierarchy,
    audioId: profile.audioId || 'road',
    effectId: profile.effectId || profile.audioId || 'road'
  };
}

function vectorFromArray(values) {
  return new THREE.Vector3(values[0], values[1], values[2]);
}
