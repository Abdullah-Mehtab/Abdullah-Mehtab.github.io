// ABOUTME: Builds authored landmark staging and dense portfolio world set pieces.
// ABOUTME: Keeps protected assets intact while adding roadsides, signs, lights, and interaction scenery.
import * as THREE from 'three';
import { ISLAND_RADIUS, SECURITY_SCAN_OFFSET, SECURITY_SCAN_ROTATION, roadPaths, worldZones } from './worldData.js';
import { mergeStaticMeshesInGroup } from './StaticBatching.js';
import { makePatchGeometry } from './WorldMaterials.js';

const Y = 0.16;
const VISIBILITY_HYSTERESIS = 10;
const GATE3R_DEFAULT_PROP_CLEARANCE = 2.4;
const LANDMARK_PRESENTATION = {
  cv: { scale: 1.42, padWidth: 16, padDepth: 10 },
  behind: { scale: 1.4, padWidth: 23, padDepth: 15 },
  skills: { scale: 1.36, padWidth: 20, padDepth: 12 },
  potato: { scale: 1.18, padWidth: 21.2, padDepth: 12.4 },
  todo: { scale: 1.34, padWidth: 17.4, padDepth: 10.4 },
  projects: { scale: 1.38, padWidth: 24, padDepth: 16 },
  career: { scale: 1.38, padWidth: 18, padDepth: 11 },
  harbor: { scale: 1.22, padWidth: 18.8, padDepth: 11.8 },
  awards: { scale: 1.34, padWidth: 18, padDepth: 11 },
  sentinel: { scale: 1.34, padWidth: 18, padDepth: 11 },
  circuit: { scale: 1.22, padWidth: 19.2, padDepth: 11.2 }
};
const POLISH_MATERIAL_LIBRARY_KEYS = {
  polish_warm_limestone: 'warmStone',
  polish_stone_shadow: 'stone',
  polish_sunlit_wood: 'wood',
  polish_charcoal_metal: 'cable',
  polish_tire_rubber: 'cable',
  polish_blue_green_glass: 'glass',
  polish_terminal_screen: 'screen',
  polish_mint_light: 'glow',
  polish_amber_light: 'warmGlow',
  polish_warning_pink: 'glowPink',
  polish_soft_purple_light: 'glowPink',
  polish_aqua_marker: 'glowBlue',
  polish_seafoam_white: 'paleStone',
  polish_palm_leaf: 'crop',
  polish_planter_flower: 'glowPink',
  polish_salt_rope: 'wood',
  polish_cv_paper: 'paleStone',
  polish_award_gold: 'gold',
  polish_crop_green: 'crop',
  polish_campus_brick: 'campusBrick',
  polish_distant_islet_sand: 'sand',
  polish_distant_islet_meadow: 'meadowDark'
};

export class SetPieces {
  constructor(world) {
    this.world = world;
    this.animated = [];
    this.securityScanObjects = [];
    this.securityScanMaterials = [];
    this.securityScanStats = {
      packetShards: 0,
      scanWaves: 0,
      visibleScanWaves: 0,
      packetMotionSamples: 0
    };
    this.securityLabStats = {
      floorMarks: 0,
      authoredAssets: 0,
      sourceAssets: 0,
      architectureAssets: 0,
      operationsGates: 0,
      routeShieldAtriums: 0,
      incidentResponseHalls: 0,
      scannerBridges: 0,
      commandDecks: 0,
      operationsCampusScaleMarkers: 0,
      routeScanPortals: 0,
      threatWatchTowers: 0,
      commandCampuses: 0,
      routeAccessControlCores: 0,
      routeShieldDoorFrames: 0,
      routeIncidentCommandScreens: 0,
      routePacketInspectionLanes: 0,
      routeSocEntryVestibules: 0,
      routeScanCanopies: 0,
      routeTriageDesks: 0,
      routeClearancePillars: 0,
      routePacketQueueTicks: 0,
      routeCampusArrivalArches: 0,
      routeCommandFrontages: 0,
      routeThreatWatchTowers: 0,
      routeIncidentResponseWings: 0,
      routeShieldCourts: 0,
      routeOperationsThresholds: 0,
      routeScanCanopyBridges: 0,
      routeThreatReviewGalleries: 0,
      routeAccessReviewBays: 0,
      routeScanStatusBands: 0,
      cableRuns: 0,
      terminalRails: 0
    };
    this.whisperEntries = [];
    this.lifeDummy = new THREE.Object3D();
    this.ambienceDummy = new THREE.Object3D();
    this.lifeInstanceMeshes = [];
    this.lifeInstanceDirty = new Set();
    this.lampGlowMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true, transparent: true, opacity: 0.9 });
    this.lampGlowGeometry = new THREE.SphereGeometry(0.26, 8, 6);
    this.lampGlowGeometries = new Map();
    this.beaconGlowGeometry = new THREE.SphereGeometry(0.34, 8, 6);
    this.beaconGlowMaterials = new Map();
    this.signAtlas = null;
    this.panelSeamMaterials = new Map();
    this.sliceSurfaceMaterials = new Map();
    this.sliceOverlayMaterials = new Map();
    this.surfacePanelStats = {
      hardscapePanels: 0,
      chippedPanels: 0,
      seamStrips: 0
    };
    this.districtAmbience = {
      mesh: null,
      entries: [],
      visible: 0
    };
    this.lifeItems = {
      zonePulses: [],
      windBanners: [],
      whisperBeacons: [],
      terminalPulses: [],
      districtSignals: []
    };
    this.qualityGroups = [];
    this.qualityStats = {
      primaryGroups: 0,
      visiblePrimaryGroups: 0,
      secondaryGroups: 0,
      visibleSecondaryGroups: 0
    };
    this.startDioramaStats = {
      burnoutScuffs: 0,
      wheelieWitnessLights: 0,
      laneRails: 0,
      launchTiles: 0,
      sightlineGuideMarks: 0,
      authoredAssets: 0
    };
    this.districtDressingEntries = [];
    this.districtVisibilityOrigin = null;
    this.districtVisibilityStats = {
      batches: 0,
      visibleBatches: 0,
      hiddenBatches: 0,
      radius: 0
    };
    this.broadSetPieceEntries = [];
    this.broadVisibilityOrigin = null;
    this.broadVisibilityStats = {
      batches: 0,
      visibleBatches: 0,
      hiddenBatches: 0,
      radius: 0,
      groups: {}
    };
    this.lifeStats = {
      zonePulses: 0,
      windBanners: 0,
      whisperBeacons: 0,
      terminalPulses: 0,
      districtMotes: 0,
      districtSignals: 0,
      visibleZonePulses: 0,
      visibleWindBanners: 0,
      visibleWhisperBeacons: 0,
      visibleTerminalPulses: 0,
      visibleDistrictMotes: 0,
      visibleDistrictSignals: 0,
      visibleTotal: 0,
      motionSamples: 0
    };
    this.gate4dLifeItems = [];
    this.gate4dLifeStats = {
      enabled: false,
      activeLandmarks: 0,
      windowGlows: 0,
      terminalPulses: 0,
      gallerySweeps: 0,
      signalPulses: 0,
      containedMotions: 0,
      visibleTotal: 0,
      visibleWindowGlows: 0,
      visibleTerminalPulses: 0,
      visibleGallerySweeps: 0,
      visibleSignalPulses: 0,
      visibleContainedMotions: 0,
      motionSamples: 0
    };
    this.approachStats = {
      clusters: 0,
      signs: 0,
      lamps: 0,
      authoredAssets: 0,
      roadMarks: 0
    };
    this.gatewayStats = {
      gateways: 0,
      lanterns: 0,
      authoredAssets: 0,
      guideStrips: 0
    };
    this.routeCompositionStats = {
      splitterIslands: 0,
      plazaEdgeKits: 0,
      bollardRuns: 0,
      routeStoryMarkers: 0,
      vistaKits: 0,
      coastalLoopStaging: 0,
      eastVistaAnchors: 0,
      authoredAssets: 0,
      guideTiles: 0,
      gate4eRouteAnchors: 0,
      routeLanterns: 0,
      signalSpires: 0
    };
    this.gate4eLaunchHubStats = {
      enabled: false,
      sourceAssets: 0,
      authoredAssets: 0,
      gatewayAssets: 0,
      arrivalPortals: 0,
      driveUnderCanopies: 0,
      destinationTiles: 0,
      legacySignsSuppressed: 0,
      routeFacingFacades: 0,
      supportFrames: 0,
      guideTiles: 0,
      firstFrameForecourts: 0,
      routeThresholdCanopies: 0,
      forecourtSideWalls: 0,
      destinationBandCues: 0,
      worldEntryPortals: 0,
      routeEntrySignalFrames: 0,
      portfolioThresholdPanels: 0
    };
    this.meadowCompositionStats = {
      pockets: 0,
      patches: 0,
      authoredAssets: 0,
      guideTiles: 0,
      lamps: 0,
      stoneRuns: 0
    };
    this.fieldBackdropStats = {
      clusters: 0,
      patches: 0,
      authoredAssets: 0,
      guideTiles: 0,
      lamps: 0,
      frameRuns: 0
    };
    this.launchFieldStats = {
      pockets: 0,
      patches: 0,
      authoredAssets: 0,
      guideTiles: 0,
      lamps: 0,
      frameRuns: 0
    };
    this.innerMeadowStats = {
      pockets: 0,
      patches: 0,
      authoredAssets: 0,
      guideTiles: 0,
      lamps: 0,
      frameRuns: 0
    };
    this.southCorridorStats = {
      clusters: 0,
      patches: 0,
      authoredAssets: 0,
      guideTiles: 0,
      lamps: 0,
      railRuns: 0
    };
    this.districtStoryStats = {
      authoredAssets: 0,
      crateStacks: 0,
      terminalBanks: 0,
      archiveSteps: 0,
      todoStacks: 0,
      documentPages: 0,
      documentStreams: 0
    };
    this.districtCompositionStats = {
      pads: 0,
      pathMarks: 0,
      lamps: 0,
      planters: 0,
      authoredAssets: 0,
      edgeTrims: 0,
      surfaceMarks: 0,
      rails: 0,
      silhouetteAnchors: 0,
      careerConnectors: 0,
      farmRows: 0,
      farmFences: 0,
      skillsTerminalNodes: 0,
      awardsArchiveNodes: 0,
      dataPierNodes: 0,
      careerOfficeNodes: 0,
      todoYardNodes: 0
    };
    this.circuitStartStats = {
      pads: 0,
      gridMarks: 0,
      authoredAssets: 0,
      checkpointGates: 0,
      scoreTowers: 0,
      arrowFences: 0,
      laneLights: 0,
      pitDetails: 0
    };
    this.harborStats = {
      pads: 0,
      pathMarks: 0,
      maxPadArea: 0,
      authoredAssets: 0,
      piers: 0,
      cargoStacks: 0,
      shadeStructures: 0,
      lamps: 0,
      beacons: 0,
      signalBeams: 0,
      signalRings: 0
    };
    this.dataPierStats = {
      pads: 0,
      pathMarks: 0,
      authoredAssets: 0,
      piers: 0,
      cargoStacks: 0,
      lamps: 0,
      beacons: 0,
      deckRails: 0
    };
    this.careerOfficeStats = {
      pads: 0,
      pathMarks: 0,
      authoredAssets: 0,
      lamps: 0,
      facadePanels: 0,
      signalFrames: 0
    };
    this.todoYardStats = {
      pads: 0,
      pathMarks: 0,
      authoredAssets: 0,
      lamps: 0,
      queueRails: 0,
      taskCards: 0,
      queuePips: 0,
      floatingTasks: 0,
      reviewRings: 0
    };
    this.skillsTerminalStats = {
      signalNodes: 0,
      codeCards: 0,
      syncRings: 0,
      signalRibbons: 0
    };
    this.projectsYardStats = {
      forgeSparks: 0,
      buildCards: 0,
      assemblyRings: 0
    };
    this.behindBuildStats = {
      processPackets: 0,
      hologramPanels: 0,
      prototypeRings: 0
    };
    this.polishMaterialStats = {
      remapped: 0,
      untouched: 0,
      missingReplacement: 0
    };
    this.blockoutStats = {
      zonePads: 0,
      zoneMarkers: 0,
      zoneLabels: 0,
      foundationAnchors: 0,
      foundationLabels: 0,
      securityGate: 0,
      securityPacketShards: 0,
      securityScanWaves: 0,
      denseDressingSkipped: true
    };
    this.verticalSliceStats = {
      enabled: false,
      authoredAssets: 0,
      staticBatches: 0,
      start: {
        launchPads: 0,
        launchLights: 0,
        burnoutScuffs: 0,
        signs: 0,
        lamps: 0,
        planters: 0,
        routeMarks: 0
      },
      campusRoute: {
        routeMarks: 0,
        lamps: 0,
        hedges: 0,
        flowerBeds: 0,
        arches: 0,
        signs: 0
      },
      fcc: {
        plazaPads: 0,
        benches: 0,
        hedges: 0,
        lamps: 0,
        planters: 0,
        signs: 0,
        identityFrames: 0
      },
      securityRoute: {
        routeMarks: 0,
        warningBollards: 0,
        lightStrips: 0,
        lamps: 0,
        signs: 0
      },
      security: {
        floorPads: 0,
        serverBlocks: 0,
        cables: 0,
        beacons: 0,
        terminalRails: 0,
        warningBollards: 0,
        lightStrips: 0,
        signs: 0
      }
    };
    this.gate4b1Stats = {
      enabled: false,
      staticBatches: 0,
      cv: {
        pads: 0,
        vaultPlinths: 0,
        documentPages: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        recordsArchiveBuildings: 0,
        archiveHalls: 0,
        vaultShells: 0,
        vaultDoors: 0,
        publicVaultPortals: 0,
        routeVaultSeals: 0,
        routeArchivePortals: 0,
        routeDocumentSpines: 0,
        routeClassificationShelves: 0,
        routeFileCapsules: 0,
        routeSideArchiveFacades: 0,
        routeSideResumeSeals: 0,
        archiveSpineTowers: 0,
        readingHallWings: 0,
        documentCrownStacks: 0,
        documentSpines: 0,
        accessKiosks: 0,
        pdfBeacons: 0,
        groundInlays: 0,
        signs: 0,
        lamps: 0,
        anchors: 0
      },
      behind: {
        pads: 0,
        workbenches: 0,
        hologramPanels: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        engineeringGarages: 0,
        garageBays: 0,
        garageShells: 0,
        toolWalls: 0,
        pipelinePanels: 0,
        assemblyHalls: 0,
        diagnosticsTowers: 0,
        overheadCranes: 0,
        sideServiceFacades: 0,
        engineeringLofts: 0,
        routeFacades: 0,
        routePrototypeBays: 0,
        routeGantryFrames: 0,
        routeTestRigDisplays: 0,
        routeToolProcessFacades: 0,
        routeInnerBuildCells: 0,
        routePrototypeRigFrames: 0,
        routeDiagnosticsWalls: 0,
        routeSourceControlSpines: 0,
        routeProcessAtriums: 0,
        routeProcessStageLanes: 0,
        routeCutawayPrototypeDisplays: 0,
        routeBuildPortals: 0,
        routeAssemblyCatwalks: 0,
        routePrototypeTestCells: 0,
        routeDiagnosticsBeaconStacks: 0,
        routeSourceControlCrowns: 0,
        sourceSpires: 0,
        sourceTotems: 0,
        statusLights: 0,
        signs: 0,
        lamps: 0,
        anchors: 0
      }
    };
    this.gate4b2Stats = {
      enabled: false,
      staticBatches: 0,
      skills: {
        pads: 0,
        terminalSlabs: 0,
        codeNodes: 0,
        codeCards: 0,
        syncRings: 0,
        signalRibbons: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        dataCenterBuildings: 0,
        serverHalls: 0,
        coolingPlants: 0,
        dataHallShells: 0,
        commandTerminals: 0,
        frontendRacks: 0,
        backendRacks: 0,
        securityRacks: 0,
        statusRings: 0,
        cableFloors: 0,
        entryAtriums: 0,
        disciplineCores: 0,
        coolingRooflines: 0,
        dataCanopies: 0,
        archiveFacades: 0,
        skillStackPortals: 0,
        learningCoreTowers: 0,
        trainingRackFacades: 0,
        dataSpineBridges: 0,
        routeLearningAtriums: 0,
        routeSkillTrees: 0,
        routeCertificationVaults: 0,
        routeDisciplineLaneSpines: 0,
        routeCurriculumPortals: 0,
        routeCurriculumSpines: 0,
        routePracticeLabPods: 0,
        routeCertificationGalleries: 0,
        routeLearningCourts: 0,
        routePracticeAtriums: 0,
        routeMentorReviewSteps: 0,
        routeCertificationBeacons: 0,
        routeLearningFacadeFaces: 0,
        routeCurriculumRibbons: 0,
        routePracticeLabWindows: 0,
        routeSkillBeaconCrowns: 0,
        sideAcademyPortals: 0,
        sideCurriculumHalls: 0,
        sidePracticeStudioBays: 0,
        sideSkillLadders: 0,
        sideCertificationCrowns: 0,
        sideMentorReviewSteps: 0,
        signs: 0,
        lamps: 0
      },
      farm: {
        pads: 0,
        farmRows: 0,
        fenceSegments: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        farmStandBuildings: 0,
        greenhouseBodies: 0,
        produceCounters: 0,
        integratedCropRows: 0,
        irrigationTanks: 0,
        irrigationRuns: 0,
        counterStands: 0,
        greenhouseAtriums: 0,
        greenhouseRoofRidges: 0,
        cropCourtFrames: 0,
        waterTowers: 0,
        fieldOffices: 0,
        routeFarmFacades: 0,
        routeProducePortals: 0,
        routeGreenhouseFrames: 0,
        routeGlassPanelBreakups: 0,
        routeProduceCounterRhythms: 0,
        routeHarvestGates: 0,
        routeCropRowLanes: 0,
        routeProduceCarts: 0,
        routePotatoCrates: 0,
        routePotatoCrests: 0,
        greenhouseMarketHalls: 0,
        harvestAtriums: 0,
        fieldCanopyFrames: 0,
        seedArchiveTowers: 0,
        harvestBeacons: 0,
        routeSideHarvestCanopies: 0,
        routeSideProduceArcades: 0,
        routeSideIrrigationTowers: 0,
        routeSideCropRibbonRows: 0,
        summonPatches: 0,
        fenceVisuals: 0,
        crates: 0,
        signs: 0,
        lamps: 0,
        anchors: 0
      }
    };
    this.gate4b3Stats = {
      enabled: false,
      staticBatches: 0,
      todo: {
        pads: 0,
        taskBoards: 0,
        queueRails: 0,
        taskCards: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        planningStudios: 0,
        studioBuildings: 0,
        planningWalls: 0,
        glassWorkrooms: 0,
        scheduleTowers: 0,
        boardWalls: 0,
        studioDesks: 0,
        reviewLanes: 0,
        taskCrates: 0,
        statusPips: 0,
        containedCardStacks: 0,
        groundInlays: 0,
        routeKanbanAtriums: 0,
        routeKanbanColumns: 0,
        planningClockDisks: 0,
        sprintReviewCanopies: 0,
        deliveryLaneTowers: 0,
        productionControlHalls: 0,
        productionControlAtriums: 0,
        backlogArchiveTowers: 0,
        sprintReviewBridges: 0,
        deliveryLaneSpines: 0,
        decisionBeacons: 0,
        routeOperationsCores: 0,
        routeReviewTheaters: 0,
        routeDeliveryBridges: 0,
        routeDecisionBeacons: 0,
        routeSprintBoardGates: 0,
        routeProductionPortals: 0,
        routeDecisionStacks: 0,
        routeBacklogArchiveWings: 0,
        routeDeliverySignalRuns: 0,
        routeSprintBoardFacades: 0,
        routeChecklistSpines: 0,
        routeCalendarCues: 0,
        routePlanningHallGlassFacades: 0,
        routePlanningHallHeaderBridges: 0,
        routePlanningHallSideWings: 0,
        routePlanningEntranceCanopies: 0,
        routeWorkflowMullions: 0,
        signs: 0,
        lamps: 0
      },
      dataPier: {
        rails: 0,
        beacons: 0,
        cargoStacks: 0,
        signs: 0,
        lamps: 0
      }
    };
    this.gate4b4Stats = {
      enabled: false,
      staticBatches: 0,
      projects: {
        pads: 0,
        projectRacks: 0,
        assemblyRings: 0,
        sparkMarkers: 0,
        authoredAssets: 0,
        sourceAssets: 0,
        architectureAssets: 0,
        foundryBuildings: 0,
        workshopShells: 0,
        buildGantries: 0,
        displayBays: 0,
        testBenches: 0,
        cableTrays: 0,
        sparkEmitters: 0,
        forgePortals: 0,
        furnaceChimneys: 0,
        sawtoothRoofs: 0,
        craneBridges: 0,
        publicGalleries: 0,
        routeFacades: 0,
        warmFacadeBands: 0,
        publicBuildTheaters: 0,
        showcaseProjectPods: 0,
        compilePipelineBridges: 0,
        repoBranchFrames: 0,
        routeBuildCranes: 0,
        routeAssemblyHalls: 0,
        routeCranePortals: 0,
        routeBuildTheaterPortals: 0,
        routeReleasePipelineSpines: 0,
        routeProjectStoryBays: 0,
        routeCompileGantryFrames: 0,
        publicBuildGalleryFrames: 0,
        foundryHeatCores: 0,
        routePublicShowcaseAtriums: 0,
        routeReleaseTheaterScreens: 0,
        routePrototypeGalleryPods: 0,
        routeCompilePipelineStages: 0,
        routeBuildReviewBalconies: 0,
        routeReleaseGantryFrames: 0,
        routePrototypeLaunchPortals: 0,
        routeBuildReviewCourts: 0,
        routeDeployBeaconStacks: 0,
        routeRepositoryAtriumFaces: 0,
        routeBuildPipelineRunways: 0,
        routePrototypeReviewWindows: 0,
        routeReleaseCraneCrowns: 0,
        routePublicBuildForecourts: 0,
        routeVehicleScaleBuildArches: 0,
        routeOpenWorkshopDoors: 0,
        routeReleaseReviewBays: 0,
        groundPlates: 0,
        signs: 0,
        lamps: 0
      },
      career: {
        pads: 0,
        officeBlocks: 0,
        facadePanels: 0,
        signalFrames: 0,
        connectorMarks: 0,
        sourceAssets: 0,
        architectureAssets: 0,
        buildingShells: 0,
        softwareHouseBuildings: 0,
        glassFacades: 0,
        entranceCanopies: 0,
        experienceWalls: 0,
        lobbyGlows: 0,
        servicePaths: 0,
        campusAtriums: 0,
        deliveryTowers: 0,
        engineeringTowers: 0,
        collaborationWings: 0,
        productBoardrooms: 0,
        codeFacades: 0,
        campusPromenades: 0,
        interviewPods: 0,
        officeFloorBands: 0,
        roadsideLobbyWings: 0,
        campusGatewayFrames: 0,
        teamAtriumBeacons: 0,
        campusArrivalPlazas: 0,
        routeHiringPortalFrames: 0,
        routeTeamBoardrooms: 0,
        routeDeliverySprintLanes: 0,
        routeCodeReviewFacades: 0,
        routeArrivalCourts: 0,
        routeHiringArcades: 0,
        routeReviewTheaters: 0,
        routeCandidateFlowSteps: 0,
        routeTeamPortals: 0,
        routeForecourtWings: 0,
        routeSoftwareHouseThresholds: 0,
        routeTeamReviewBays: 0,
        routeDeliveryFlowBars: 0,
        routeCampusEntryBeacons: 0,
        routeArrivalBoulevards: 0,
        routeReceptionCanopies: 0,
        routeHiringReviewPavilions: 0,
        routeTeamFlowBridges: 0,
        routeSprintBeaconStacks: 0,
        signs: 0,
        lamps: 0
      },
      harbor: {
        deckPads: 0,
        signalMasts: 0,
        contactTerminals: 0,
        beacons: 0,
        sourceAssets: 0,
        deckPlatforms: 0,
        deckSeams: 0,
        deckEdges: 0,
        relayMasts: 0,
        githubTerminals: 0,
        linkedinTerminals: 0,
        emailTerminals: 0,
        beaconPulses: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        communicationsStations: 0,
        operationsHalls: 0,
        glassRelayRooms: 0,
        antennaServiceWings: 0,
        broadcastTowers: 0,
        dishArrays: 0,
        sideServiceFacades: 0,
        routeFacades: 0,
        signalCrowns: 0,
        contactTerminalRooms: 0,
        publicContactPortals: 0,
        publicChannelBays: 0,
        messageBeaconWalls: 0,
        relayCrownArrays: 0,
        shoreDishSilhouettes: 0,
        roadsideContactFacades: 0,
        contactGatewayPortals: 0,
        messageExchangeAtriums: 0,
        channelBeaconMasts: 0,
        inboxBeaconWalls: 0,
        routeContactExchangeHalls: 0,
        routeInboxOutboxFrames: 0,
        routeChannelSpines: 0,
        routeMessageFlowTicks: 0,
        routePublicSignalGateways: 0,
        routeInboxOutboxTowers: 0,
        routeMessageBridgeSpans: 0,
        routeSignalCrownArrays: 0,
        routeContactBeaconSpines: 0,
        routeContactForecourts: 0,
        routeMessageLanes: 0,
        routeExchangeDesks: 0,
        routeContactEnvelopeArches: 0,
        routeExchangeCanopies: 0,
        routeSignalQueuePylons: 0,
        routeContactArrivalConcourses: 0,
        routeConcourseEdges: 0,
        routeContactQueueSteps: 0,
        routePublicSignalArrivalThresholds: 0,
        routeVehicleMessagePortals: 0,
        routeContactSignalWindows: 0,
        routeMessageArrivalBays: 0,
        signs: 0,
        lamps: 0
      }
    };
    this.gate4b5Stats = {
      enabled: false,
      staticBatches: 0,
      awards: {
        pads: 0,
        archiveSteps: 0,
        trophyPlinths: 0,
        goldAccents: 0,
        authoredAssets: 0,
        sourceAssets: 0,
        architectureAssets: 0,
        galleryBases: 0,
        museumHalls: 0,
        plaqueWalls: 0,
        certificateFrames: 0,
        ceremonialSteps: 0,
        warmAccents: 0,
        routeTrophyAtriums: 0,
        routeMedalCrowns: 0,
        routeCertificateGalleries: 0,
        routeHonorsEntryAxes: 0,
        routeHonorsBoulevards: 0,
        routeMedalGates: 0,
        routeTrophyRotundas: 0,
        routeCeremonialCrowns: 0,
        routeHonorsForecourts: 0,
        routeCeremonialWalks: 0,
        routeHonorsThresholds: 0,
        routeHonorsArrivalArches: 0,
        routeHonorsMedalWindows: 0,
        routeCertificateFriezes: 0,
        signs: 0,
        lamps: 0
      },
      sentinel: {
        pads: 0,
        ridgeTowers: 0,
        signalTotems: 0,
        shardPanels: 0,
        sourceAssets: 0,
        authoredAssets: 0,
        architectureAssets: 0,
        socTowers: 0,
        operationsHalls: 0,
        glassOpsRooms: 0,
        serverRacks: 0,
        perimeterPylons: 0,
        groundPlates: 0,
        towerBases: 0,
        scannerCrowns: 0,
        alertWalls: 0,
        packetShardPanels: 0,
        shieldGateFrames: 0,
        threatIntelMasts: 0,
        blueTeamBridges: 0,
        commandCatwalks: 0,
        routeShieldAtriums: 0,
        incidentResponseHalls: 0,
        scannerBridges: 0,
        overwatchDecks: 0,
        solidCommandWings: 0,
        commandWindowBands: 0,
        scanPortalFrames: 0,
        threatWalls: 0,
        commandCampusScaleMarkers: 0,
        routeShieldPortals: 0,
        overwatchTowerSilhouettes: 0,
        commandTowerSilhouettes: 0,
        routeCommandFacades: 0,
        routeShieldCrests: 0,
        routeThreatBoards: 0,
        routeStatusLanes: 0,
        routeOpsPortals: 0,
        routeWarRooms: 0,
        routeWarRoomCommandDesks: 0,
        routePacketQueueRails: 0,
        routeDefenseCanopies: 0,
        routeEntryPorticos: 0,
        routeEntryWarRoomGlass: 0,
        routeShieldThresholdArches: 0,
        routeSocFrontageWings: 0,
        routeInspectionLaneMarks: 0,
        routeThreatIntelCrowns: 0,
        routeCommandBeaconMasts: 0,
        signs: 0,
        lamps: 0
      },
      circuit: {
        pads: 0,
        startGates: 0,
        laneCurbs: 0,
        signalLights: 0,
        authoredAssets: 0,
        sourceAssets: 0,
        architectureAssets: 0,
        timeTrialGates: 0,
        launchLanes: 0,
        timingControlRooms: 0,
        timePylons: 0,
        startGantries: 0,
        timingBooths: 0,
        raceControlTowers: 0,
        scoreboards: 0,
        grandstands: 0,
        timingFacades: 0,
        checkpointCrowns: 0,
        pitWallFacades: 0,
        startLights: 0,
        checkpointMarkers: 0,
        routeArrows: 0,
        pocketCurbVisuals: 0,
        overheadCheckpointPortals: 0,
        lapClockDisks: 0,
        startLightTrees: 0,
        raceControlBridges: 0,
        pitWallRhythms: 0,
        checkeredTimingPanels: 0,
        routeRaceControlPorticos: 0,
        routeDriveThroughTunnels: 0,
        routeControlCabins: 0,
        routeLapSignalStacks: 0,
        routeCheckpointLaneFrames: 0,
        routeApproachTimingPortals: 0,
        routeTimingRibbonWalls: 0,
        routeApproachControlCabins: 0,
        routeApproachLapSignalStacks: 0,
        routeApproachCheckpointLaneFrames: 0,
        routeStarterArcades: 0,
        routeSplitTimerBlades: 0,
        routeCountdownTrees: 0,
        routeCheckeredCrowns: 0,
        routeRecoveryRailRuns: 0,
        signs: 0,
        lamps: 0
      }
    };
    this.gate4b6Stats = {
      enabled: false,
      staticBatches: 0,
      pads: 0,
      entryGates: 0,
      laneCurbs: 0,
      slalomCones: 0,
      tireStacks: 0,
      startLines: 0,
      landingMarkers: 0,
      scorePosts: 0,
      arrowPanels: 0,
      trackScuffs: 0,
      authoredAssets: 0,
      physicalColliders: 0,
      signs: 0,
      lamps: 0
    };
    this.gate3rPlacementStats = {
      recorded: 0,
      intentionalRoadOverlays: 0,
      roadIntrusions: 0,
      minClearance: null,
      recordedFootprints: 0,
      footprintIntrusions: 0,
      minFootprintClearance: null,
      shorelineFootprintIntrusions: 0,
      maxFootprintRadius: 0,
      byKind: {},
      byFootprintKind: {},
      entries: []
    };
  }

  build() {
    if (this.world.foundationReplacementMode) {
      this.createFoundationScaffold();
      if (this.world.gate3rMode || this.world.gate4b1Mode || this.world.gate4b2Mode || this.world.gate4b3Mode || this.world.gate4b4Mode || this.world.gate4b5Mode || this.world.gate4b6Mode) {
        this.createGate3RVerticalSliceScaffold();
      }
      if (this.world.gate4b1Mode) {
        this.createGate4B1SouthRunScaffold();
      }
      if (this.world.gate4b2Mode) {
        this.createGate4B2WestServiceScaffold();
      }
      if (this.world.gate4b3Mode) {
        this.createGate4B3DataPierSideScaffold();
      }
      if (this.world.gate4b4Mode) {
        this.createGate4B4EastSideScaffold();
      }
      if (this.world.gate4b5Mode) {
        this.createGate4B5NorthRidgeScaffold();
      }
      if (this.world.gate4dLifeMode) {
        this.createGate4DLifeInteractionPass();
      }
      if (this.world.gate4eRouteCompositionMode) {
        this.createGate4ERouteCompositionPass();
      }
      if (this.world.gate4eLaunchHubMode) {
        this.createGate4ELaunchHubCompositionPass();
      }
      this.applyQuality();
      return;
    }
    if (this.world.verticalSliceMode) {
      this.createVerticalSliceScaffold();
      this.applyQuality();
      return;
    }
    if (this.world.blockoutMode) {
      this.createBlockoutScaffold();
      this.applyQuality();
      return;
    }
    this.createStartDiorama();
    this.createEducationPlaza();
    this.createSecurityLab();
    this.createDistrictDressing();
    this.createDistrictHeroDressing();
    this.createApproachDressing();
    this.createDistrictGateways();
    this.createRouteGuidance();
    this.createRouteComposition();
    this.createMeadowComposition();
    this.createFieldBackdrops();
    this.createLaunchFieldFrame();
    this.createInnerMeadowFrame();
    this.createSouthCorridorForeground();
    this.createLivingSignals();
    this.createDistrictAmbience();
    this.applyQuality();
  }

  update(dt, elapsed, vehiclePosition) {
    this.updateDistrictDressingVisibility(vehiclePosition);
    this.updateBroadSetPieceVisibility(vehiclePosition);
    const scan = this.world.securityScan;
    const activePulse = scan.active ? 1 : scan.complete ? 0.55 : 0;
    let visibleScanWaves = 0;
    for (const item of this.animated) {
      if (item.kind === 'cvDocumentStream') {
        this.updateCvDocumentStream(item, elapsed);
        continue;
      }
      if (item.kind === 'behindBuildLife') {
        this.updateBehindBuildLife(item, elapsed);
        continue;
      }
      if (item.kind === 'projectsYardLife') {
        this.updateProjectsYardLife(item, elapsed);
        continue;
      }
      if (item.kind === 'skillsTerminalLife') {
        this.updateSkillsTerminalLife(item, elapsed);
        continue;
      }
      if (item.kind === 'todoYardLife') {
        this.updateTodoYardLife(item, elapsed);
        continue;
      }
      if (item.kind === 'gate4dLife') {
        this.updateGate4DLifeItem(item, elapsed);
        continue;
      }
      if (item.instanceMesh) {
        this.writeLifeInstance(item, elapsed);
        this.lifeInstanceDirty.add(item.instanceMesh);
        continue;
      }
      if (item.active === false) continue;
      if (item.kind === 'ring') {
        item.mesh.rotation.z += dt * item.speed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.pulse + item.phase) * item.opacityRange;
      } else if (item.kind === 'float') {
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.rotation.y += dt * item.rotationSpeed;
      } else if (item.kind === 'light') {
        item.light.intensity = item.base + Math.sin(elapsed * item.speed + item.phase) * item.range;
      } else if (item.kind === 'pulse') {
        const pulse = item.baseScale + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.scale.setScalar(pulse);
        item.mesh.rotation.z += dt * item.rotationSpeed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.speed + item.phase) * item.opacityRange;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'banner') {
        item.mesh.rotation.z = Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.scale.x = item.baseScale + Math.sin(elapsed * item.speed * 1.31 + item.phase) * 0.08;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'beacon') {
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.rotation.y += dt * item.rotationSpeed;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.speed + item.phase) * item.opacityRange;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'harborSignalBeam') {
        item.mesh.rotation.y = item.baseRotation + Math.sin(elapsed * item.speed + item.phase) * item.range;
        item.mesh.material.opacity = item.baseOpacity + Math.sin(elapsed * item.opacitySpeed + item.phase) * item.opacityRange;
        this.lifeStats.motionSamples += 1;
      } else if (item.kind === 'securityPacket') {
        const packetPulse = scan.active ? 1 : scan.complete ? 0.35 : 0;
        item.mesh.visible = packetPulse > 0.05;
        if (!item.mesh.visible) continue;
        const angle = elapsed * item.orbitSpeed + item.phase;
        const orbitX = item.scanX + Math.cos(angle) * item.orbitRadius;
        const orbitZ = item.scanZ + Math.sin(angle) * item.orbitRadius;
        item.mesh.position.x = THREE.MathUtils.lerp(item.baseX, orbitX, packetPulse);
        item.mesh.position.z = THREE.MathUtils.lerp(item.baseZ, orbitZ, packetPulse);
        item.mesh.position.y = item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.range + packetPulse * 0.72;
        item.mesh.rotation.y += dt * (item.rotationSpeed + packetPulse * 2.4);
        item.mesh.material.opacity = item.baseOpacity + packetPulse * 0.34 + Math.sin(elapsed * 5.2 + item.phase) * packetPulse * 0.12;
        this.securityScanStats.packetMotionSamples += 1;
      } else if (item.kind === 'securityWave') {
        const pulse = Math.max(0, activePulse);
        const wave = (elapsed * item.speed + item.phase) % 1;
        const scale = item.baseScale + wave * item.range;
        item.mesh.visible = pulse > 0.05;
        item.mesh.scale.setScalar(scale);
        item.mesh.rotation.z += dt * item.rotationSpeed;
        item.mesh.material.opacity = pulse * (0.16 + (1 - wave) * 0.28);
        if (item.mesh.visible) visibleScanWaves += 1;
      }
    }
    for (const mesh of this.lifeInstanceDirty) mesh.instanceMatrix.needsUpdate = true;
    this.lifeInstanceDirty.clear();
    this.updateDistrictAmbience(elapsed);

    this.securityScanStats.visibleScanWaves = visibleScanWaves;
    for (const material of this.securityScanMaterials) {
      material.opacity = 0.32 + activePulse * 0.42 + Math.sin(elapsed * 8) * activePulse * 0.12;
    }
    for (const light of this.securityScanObjects) {
      if (light.isLight) {
        light.intensity = light.userData.baseIntensity + activePulse * light.userData.boost + Math.sin(elapsed * 12) * activePulse * 0.55;
      } else if (light.material) {
        light.material.opacity = 0.48 + activePulse * 0.34;
        light.scale.setScalar(1 + activePulse * 0.24);
      }
    }
  }

  applyQuality() {
    const limits = this.world.getQualityProfile().lifeSignals || {};
    this.applyLifeLimit('zonePulses', limits.zonePulses);
    this.applyLifeLimit('windBanners', limits.windBanners);
    this.applyLifeLimit('whisperBeacons', limits.whisperBeacons);
    this.applyLifeLimit('terminalPulses', limits.terminalPulses);
    this.applyLifeLimit('districtSignals', limits.districtSignals);
    this.applyDistrictAmbienceLimit(limits.districtMotes);
    this.applyGate4DLifeQuality();
    this.applyQualityGroups();
    this.updateDistrictDressingVisibility();
    this.updateBroadSetPieceVisibility();
    this.lifeStats.visibleTotal =
      this.lifeStats.visibleZonePulses +
      this.lifeStats.visibleWindBanners +
      this.lifeStats.visibleWhisperBeacons +
      this.lifeStats.visibleTerminalPulses +
      this.lifeStats.visibleDistrictMotes +
      this.lifeStats.visibleDistrictSignals;
  }

  applyQualityGroups() {
    const hideSecondary = this.world.landscapeQuality === 'low';
    let primaryGroups = 0;
    let visiblePrimaryGroups = 0;
    let secondaryGroups = 0;
    let visibleSecondaryGroups = 0;
    for (const entry of this.qualityGroups) {
      if (entry.tier === 'primary') {
        primaryGroups += 1;
        entry.group.visible = true;
        visiblePrimaryGroups += 1;
        continue;
      }
      if (entry.tier !== 'secondary') continue;
      secondaryGroups += 1;
      entry.group.visible = !hideSecondary;
      if (entry.group.visible) visibleSecondaryGroups += 1;
    }
    this.qualityStats.primaryGroups = primaryGroups;
    this.qualityStats.visiblePrimaryGroups = visiblePrimaryGroups;
    this.qualityStats.secondaryGroups = secondaryGroups;
    this.qualityStats.visibleSecondaryGroups = visibleSecondaryGroups;
  }

  registerQualityGroup(group, tier) {
    this.qualityGroups.push({ group, tier });
    return group;
  }

  applyLifeLimit(category, limit) {
    const items = this.lifeItems[category];
    const visibleLimit = Math.min(items.length, Number.isFinite(limit) ? limit : items.length);
    const sharedInstanceMesh = items[0]?.entry?.instanceMesh;
    if (sharedInstanceMesh && items.every((item) => item.entry.instanceMesh === sharedInstanceMesh)) {
      sharedInstanceMesh.count = visibleLimit;
    }
    let visible = 0;
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      const active = index < visibleLimit;
      item.entry.active = active;
      if (item.root) item.root.visible = active;
      if (item.entry.instanceMesh) {
        this.writeLifeInstance(item.entry, 0);
        item.entry.instanceMesh.instanceMatrix.needsUpdate = true;
      }
      if (active) visible += 1;
    }
    const statName = `visible${category[0].toUpperCase()}${category.slice(1)}`;
    this.lifeStats[statName] = visible;
  }

  getLifeStats() {
    return { ...this.lifeStats };
  }

  getGate4DLifeStats() {
    return { ...this.gate4dLifeStats };
  }

  getQualityStats() {
    return { ...this.qualityStats };
  }

  getGate3RPlacementStats() {
    return {
      ...this.gate3rPlacementStats,
      byKind: { ...this.gate3rPlacementStats.byKind },
      byFootprintKind: { ...this.gate3rPlacementStats.byFootprintKind },
      entries: this.gate3rPlacementStats.entries.map((entry) => ({ ...entry }))
    };
  }

  getGate4B1Stats() {
    return {
      ...this.gate4b1Stats,
      cv: { ...this.gate4b1Stats.cv },
      behind: { ...this.gate4b1Stats.behind }
    };
  }

  getGate4B2Stats() {
    return {
      ...this.gate4b2Stats,
      skills: { ...this.gate4b2Stats.skills },
      farm: { ...this.gate4b2Stats.farm }
    };
  }

  getGate4B3Stats() {
    return {
      ...this.gate4b3Stats,
      todo: { ...this.gate4b3Stats.todo },
      dataPier: { ...this.gate4b3Stats.dataPier }
    };
  }

  getGate4B4Stats() {
    return {
      ...this.gate4b4Stats,
      projects: { ...this.gate4b4Stats.projects },
      career: { ...this.gate4b4Stats.career },
      harbor: { ...this.gate4b4Stats.harbor }
    };
  }

  getGate4B5Stats() {
    return {
      ...this.gate4b5Stats,
      awards: { ...this.gate4b5Stats.awards },
      sentinel: { ...this.gate4b5Stats.sentinel },
      circuit: { ...this.gate4b5Stats.circuit }
    };
  }

  getGate4B6Stats() {
    return { ...this.gate4b6Stats };
  }

  getStartDioramaStats() {
    return { ...this.startDioramaStats };
  }

  getDistrictVisibilityStats() {
    return { ...this.districtVisibilityStats };
  }

  getBroadVisibilityStats() {
    return {
      ...this.broadVisibilityStats,
      groups: { ...this.broadVisibilityStats.groups }
    };
  }

  getApproachStats() {
    return { ...this.approachStats };
  }

  getGatewayStats() {
    return { ...this.gatewayStats };
  }

  getRouteCompositionStats() {
    return { ...this.routeCompositionStats };
  }

  getGate4ELaunchHubStats() {
    return { ...this.gate4eLaunchHubStats };
  }

  getSecurityScanStats() {
    return { ...this.securityScanStats };
  }

  getSecurityLabStats() {
    return { ...this.securityLabStats };
  }

  getMeadowCompositionStats() {
    return { ...this.meadowCompositionStats };
  }

  getFieldBackdropStats() {
    return { ...this.fieldBackdropStats };
  }

  getLaunchFieldStats() {
    return { ...this.launchFieldStats };
  }

  getInnerMeadowStats() {
    return { ...this.innerMeadowStats };
  }

  getSouthCorridorStats() {
    return { ...this.southCorridorStats };
  }

  getDistrictStoryStats() {
    return { ...this.districtStoryStats };
  }

  getDistrictCompositionStats() {
    return { ...this.districtCompositionStats };
  }

  getSurfacePanelStats() {
    return { ...this.surfacePanelStats };
  }

  getCircuitStartStats() {
    return { ...this.circuitStartStats };
  }

  getHarborStats() {
    return { ...this.harborStats };
  }

  getDataPierStats() {
    return { ...this.dataPierStats };
  }

  getCareerOfficeStats() {
    return { ...this.careerOfficeStats };
  }

  getTodoYardStats() {
    return { ...this.todoYardStats };
  }

  getSkillsTerminalStats() {
    return { ...this.skillsTerminalStats };
  }

  getProjectsYardStats() {
    return { ...this.projectsYardStats };
  }

  getBehindBuildStats() {
    return { ...this.behindBuildStats };
  }

  getPolishMaterialStats() {
    return { ...this.polishMaterialStats };
  }

  getBlockoutStats() {
    return { ...this.blockoutStats };
  }

  getVerticalSliceStats() {
    return {
      ...this.verticalSliceStats,
      start: { ...this.verticalSliceStats.start },
      campusRoute: { ...this.verticalSliceStats.campusRoute },
      fcc: { ...this.verticalSliceStats.fcc },
      securityRoute: { ...this.verticalSliceStats.securityRoute },
      security: { ...this.verticalSliceStats.security }
    };
  }

  getWhisperEntries() {
    return this.whisperEntries.map((entry) => ({
      index: entry.index,
      message: entry.message,
      color: entry.color,
      active: entry.active !== false,
      position: entry.position.clone()
    }));
  }

  getNearestWhisper(position, maxDistance = 9.5) {
    if (!position) return null;
    let best = null;
    for (const entry of this.whisperEntries) {
      if (entry.active === false) continue;
      const distance = Math.hypot(position.x - entry.position.x, position.z - entry.position.z);
      if (distance > maxDistance || (best && distance >= best.distance)) continue;
      best = {
        key: `whisper-${entry.index}`,
        index: entry.index,
        message: entry.message,
        color: entry.color,
        distance,
        position: entry.position
      };
    }
    return best;
  }

  createFoundationScaffold() {
    const group = new THREE.Group();
    group.name = 'FOUNDATION_Security_Gate';

    this.createBlockoutSecurityScan(group);
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'FOUNDATION_security_gate',
      shouldSkip: (object) => ['SecurityPacketShard', 'SecurityScanWave', 'ScannerLightCurtain'].includes(object.name)
    });
    this.world.scene.add(group);
  }

  createBlockoutScaffold() {
    const group = new THREE.Group();
    group.name = 'BLOCKOUT_Island_District_Scaffold';
    const verticalSliceMode = this.world.verticalSliceMode;
    const focusZones = new Set(['landing', 'education', 'security']);
    const materials = {
      landing: this.world.materials.plazaRoad,
      security: this.world.materials.securityRoad,
      projects: this.world.materials.stoneRoad,
      sentinel: this.world.materials.stone,
      career: this.world.materials.paleStone,
      skills: this.world.materials.securityRoad,
      education: this.world.materials.paleStone,
      awards: this.world.materials.warmStone,
      cv: this.world.materials.paleStone,
      todo: this.world.materials.warmStone,
      circuit: this.world.materials.stuntRamp,
      contact: this.world.materials.sand,
      behind: this.world.materials.stoneRoad,
      drift: this.world.materials.stuntRamp,
      'data-pier': this.world.materials.wood,
      potato: this.world.materials.dirtRoad
    };

    for (const zone of worldZones) {
      const focusZone = focusZones.has(zone.id);
      const blockoutScale = verticalSliceMode ? (focusZone ? 0.3 : 0.52) : 1;
      const size = Math.max(12, zone.radius * 2.2) * blockoutScale;
      const depth = Math.max(10, zone.radius * 1.7) * blockoutScale;
      const material = materials[zone.id] || this.world.materials.plazaRoad;
      const padY = verticalSliceMode ? 0.112 : 0.126;
      const markerWidth = verticalSliceMode ? 0.55 : 1.1;
      const markerHeight = verticalSliceMode ? 0.58 : 2.1;
      const markerY = verticalSliceMode ? 0.42 : 1.08;
      const labelScale = verticalSliceMode ? (focusZone ? 0.86 : 0.68) : 1.35;
      const labelDistance = zone.radius + (verticalSliceMode ? 3.2 : 5);
      this.groundRect(group, zone.position[0], zone.position[2], size, depth, material, padY, `BLOCKOUT_${zone.id}_district_pad`, zone.rotation || 0);
      this.box(group, zone.position[0], markerY, zone.position[2], markerWidth, markerHeight, markerWidth, material, zone.rotation || 0, `BLOCKOUT_${zone.id}_zone_marker`);
      this.addSign(
        group,
        zone.name.toUpperCase(),
        zone.kind,
        zone.position[0] + Math.cos(zone.rotation || 0) * labelDistance,
        zone.position[2] - Math.sin(zone.rotation || 0) * labelDistance,
        (zone.rotation || 0) + Math.PI * 0.5,
        Number.parseInt(zone.color.slice(1), 16),
        labelScale,
        `BLOCKOUT_${zone.id}_label`
      );
      this.blockoutStats.zonePads += 1;
      this.blockoutStats.zoneMarkers += 1;
      this.blockoutStats.zoneLabels += 1;
    }

    this.createBlockoutSecurityScan(group);
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'BLOCKOUT_scaffold',
      shouldSkip: (object) => ['SecurityPacketShard', 'SecurityScanWave', 'ScannerLightCurtain'].includes(object.name)
    });
    this.world.scene.add(group);
  }

  createBlockoutSecurityScan(group) {
    const zone = findZone('security');
    const scan = this.securityScanPose(zone);
    const scanX = scan.x;
    const scanZ = scan.z;
    if (!this.world.foundationReplacementMode) {
      const scanPadWidth = this.world.verticalSliceMode ? 16 : 24;
      const scanPadDepth = this.world.verticalSliceMode ? 12 : 18;
      const scanPadY = this.world.verticalSliceMode ? 0.116 : 0.138;
      this.groundRect(group, scanX, scanZ, scanPadWidth, scanPadDepth, this.world.materials.securityRoad, scanPadY, 'BLOCKOUT_security_scan_pad', scan.rotation);
    }
    this.securityGate(group, scanX, scanZ, scan.rotation);
    this.blockoutStats.securityGate += 1;
    if (this.world.foundationReplacementMode) return;

    this.securityScanWaveField(group, scanX, scanZ, scan.rotation);
    for (let i = 0; i < 8; i += 1) {
      const packetMaterial = this.world.materials.glowBlue.clone();
      packetMaterial.opacity = 0.46;
      const packet = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), packetMaterial);
      packet.name = 'SecurityPacketShard';
      packet.visible = false;
      packet.position.set(zone.position[0] - 10 + i * 2.9, 1.2 + (i % 3) * 0.2, zone.position[2] + 5 + Math.sin(i) * 1.8);
      group.add(packet);
      this.animated.push({
        kind: 'securityPacket',
        mesh: packet,
        baseX: packet.position.x,
        baseY: packet.position.y,
        baseZ: packet.position.z,
        baseOpacity: 0.46,
        scanX,
        scanZ,
        orbitRadius: 3.2 + (i % 3) * 0.42,
        orbitSpeed: 1.6 + i * 0.08,
        speed: 1.2,
        phase: i * 0.7,
        range: 0.34,
        rotationSpeed: 1.1 + i * 0.05
      });
      this.securityScanStats.packetShards += 1;
      this.blockoutStats.securityPacketShards += 1;
    }
    this.blockoutStats.securityScanWaves = this.securityScanStats.scanWaves;
  }

  createVerticalSliceScaffold() {
    this.createBlockoutScaffold();
    this.verticalSliceStats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE3_Start_FCC_Security_Vertical_Slice';
    this.createGate3StartHub(group);
    this.createGate3CampusRoute(group);
    this.createGate3FccGrove(group);
    this.createGate3SecurityRoute(group);
    this.createGate3SecurityLab(group);

    this.verticalSliceStats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE3_slice',
      cellSize: 64,
      shouldSkip: (object) => (
        object.name === 'SecurityPacketShard'
        || object.name === 'SecurityScanWave'
        || object.name === 'ScannerLightCurtain'
        || object.name === 'SetPieceBeaconGlow'
      )
    });
    this.world.scene.add(group);
  }

  createGate3RVerticalSliceScaffold() {
    this.verticalSliceStats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE3R_Start_FCC_Security_Vertical_Slice';
    this.createGate3RStartHub(group);
    this.createGate3RCampusRoute(group);
    this.createGate3RFccGrove(group);
    this.createGate3RSecurityRoute(group);
    this.createGate3RSecurityLab(group);

    this.verticalSliceStats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE3R_slice',
      cellSize: 56,
      shouldSkip: (object) => (
        object.name === 'SecurityPacketShard'
        || object.name === 'SecurityScanWave'
        || object.name === 'ScannerLightCurtain'
        || object.name === 'SetPieceBeaconGlow'
      )
    });
    this.world.scene.add(group);
  }

  createGate4B1SouthRunScaffold() {
    this.gate4b1Stats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE4B1_South_Run_CV_Behind';
    this.createGate4B1CvVault(group);
    this.createGate4B1BehindBuild(group);

    this.gate4b1Stats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4B1_south_run',
      cellSize: 48,
      shouldSkip: (object) => object.name.endsWith('_Glow')
    });
    this.world.scene.add(group);
  }

  createGate4B1CvVault(group) {
    const zone = findZone('cv');
    const stats = this.gate4b1Stats.cv;
    const rotation = zone.rotation || 0.12;
    const anchor = { x: -36, z: -88, rotation };
    const presentation = LANDMARK_PRESENTATION.cv;
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.paleStone, 0.132, 'GATE4D_CV_Records_Archive_Civic_Plate', rotation, 'gate4d-cv-footprint', 5.0);
    stats.pads += 1;

    const archive = point(0, 0.1);
    if (this.addPolishAsset(group, 'EnvPolishCvRecordsArchive', archive[0], archive[1], rotation + Math.PI, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-cv-records-archive', 'GATE4D_CV_Records_Archive_Architecture', archive[0], archive[1], { minClearance: 4.8 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.recordsArchiveBuildings += 1;
      stats.archiveHalls += 1;
      stats.vaultShells += 1;
      stats.vaultDoors += 1;
      stats.publicVaultPortals += 1;
      stats.routeVaultSeals += 2;
      stats.routeArchivePortals += 1;
      stats.routeDocumentSpines += 1;
      stats.routeClassificationShelves += 6;
      stats.routeFileCapsules += 7;
      stats.routeSideArchiveFacades += 2;
      stats.routeSideResumeSeals += 2;
      stats.archiveSpineTowers += 2;
      stats.readingHallWings += 2;
      stats.documentCrownStacks += 7;
      stats.documentSpines += 8;
      stats.documentPages += 8;
      stats.accessKiosks += 1;
      stats.pdfBeacons += 1;
      stats.groundInlays += 1;
    }

    stats.vaultPlinths = stats.recordsArchiveBuildings;
    stats.anchors = stats.accessKiosks + stats.pdfBeacons;
  }

  createGate4B1BehindBuild(group) {
    const zone = findZone('behind');
    const stats = this.gate4b1Stats.behind;
    const rotation = zone.rotation || 0.08;
    const anchor = { x: 35, z: -76, rotation };
    const presentation = LANDMARK_PRESENTATION.behind;
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.stoneRoad, 0.132, 'GATE4D_Behind_Engineering_Garage_Service_Court', rotation, 'gate4d-behind-footprint', 5.0);
    stats.pads += 1;

    const garage = point(0, 0.05);
    if (this.addPolishAsset(group, 'EnvPolishBehindEngineeringGarage', garage[0], garage[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-behind-engineering-garage', 'GATE4D_Behind_Engineering_Garage_Architecture', garage[0], garage[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.engineeringGarages += 1;
      stats.garageShells += 1;
      stats.garageBays += 1;
      stats.workbenches += 1;
      stats.toolWalls += 3;
      stats.pipelinePanels += 1;
      stats.hologramPanels += 4;
      stats.assemblyHalls += 1;
      stats.diagnosticsTowers += 1;
      stats.overheadCranes += 1;
      stats.sideServiceFacades += 1;
      stats.engineeringLofts += 1;
      stats.routeFacades += 1;
      stats.routePrototypeBays += 1;
      stats.routeGantryFrames += 1;
      stats.routeTestRigDisplays += 1;
      stats.routeToolProcessFacades += 1;
      stats.routeInnerBuildCells += 1;
      stats.routePrototypeRigFrames += 1;
      stats.routeDiagnosticsWalls += 1;
      stats.routeSourceControlSpines += 1;
      stats.routeProcessAtriums += 1;
      stats.routeProcessStageLanes += 6;
      stats.routeCutawayPrototypeDisplays += 1;
      stats.routeBuildPortals += 1;
      stats.routeAssemblyCatwalks += 1;
      stats.routePrototypeTestCells += 1;
      stats.routeDiagnosticsBeaconStacks += 1;
      stats.routeSourceControlCrowns += 1;
      stats.sourceSpires += 1;
      stats.sourceTotems += 1;
      stats.statusLights += 4;
    }

    stats.anchors = stats.sourceTotems;
  }

  createGate4B2WestServiceScaffold() {
    this.gate4b2Stats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE4B2_West_Service_Skills_Farm';
    this.createGate4B2SkillsTerminal(group);
    this.createGate4B2PotatoFarm(group);

    this.gate4b2Stats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4B2_west_service',
      cellSize: 48,
      shouldSkip: (object) => object.name.endsWith('_Glow') || object.material?.transparent
    });
    this.world.scene.add(group);
  }

  createGate4B2SkillsTerminal(group) {
    const stats = this.gate4b2Stats.skills;
    const anchor = { x: -94, z: -84, rotation: 0.24 };
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.skills;
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.securityRoad, 0.132, 'GATE4D_Skills_Data_Center_Service_Court', rotation, 'gate4d-skills-footprint', 5.0);
    stats.pads += 1;

    const dataCenter = point(0, 0.05);
    if (this.addPolishAsset(group, 'EnvPolishSkillsDataCenter', dataCenter[0], dataCenter[1], rotation + Math.PI, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-skills-data-center', 'GATE4D_Skills_Data_Center_Architecture', dataCenter[0], dataCenter[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.dataCenterBuildings += 1;
      stats.serverHalls += 1;
      stats.coolingPlants += 1;
      stats.dataHallShells += 1;
      stats.commandTerminals += 1;
      stats.frontendRacks += 1;
      stats.backendRacks += 1;
      stats.securityRacks += 1;
      stats.statusRings += 1;
      stats.syncRings += 1;
      stats.cableFloors += 4;
      stats.signalRibbons += 4;
      stats.entryAtriums += 1;
      stats.disciplineCores += 4;
      stats.coolingRooflines += 1;
      stats.dataCanopies += 1;
      stats.archiveFacades += 1;
      stats.skillStackPortals += 1;
      stats.learningCoreTowers += 4;
      stats.trainingRackFacades += 1;
      stats.dataSpineBridges += 1;
      stats.routeLearningAtriums += 1;
      stats.routeSkillTrees += 1;
      stats.routeCertificationVaults += 1;
      stats.routeDisciplineLaneSpines += 1;
      stats.routeCurriculumPortals += 1;
      stats.routeCurriculumSpines += 1;
      stats.routePracticeLabPods += 4;
      stats.routeCertificationGalleries += 1;
      stats.routeLearningCourts += 1;
      stats.routePracticeAtriums += 1;
      stats.routeMentorReviewSteps += 5;
      stats.routeCertificationBeacons += 1;
      stats.routeLearningFacadeFaces += 3;
      stats.routeCurriculumRibbons += 18;
      stats.routePracticeLabWindows += 18;
      stats.routeSkillBeaconCrowns += 1;
      stats.sideAcademyPortals += 1;
      stats.sideCurriculumHalls += 1;
      stats.sidePracticeStudioBays += 4;
      stats.sideSkillLadders += 1;
      stats.sideCertificationCrowns += 1;
      stats.sideMentorReviewSteps += 4;
    }

    stats.terminalSlabs = stats.commandTerminals;
    stats.codeNodes = stats.frontendRacks + stats.backendRacks + stats.securityRacks;
    stats.codeCards = 0;
    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4B2PotatoFarm(group) {
    const stats = this.gate4b2Stats.farm;
    const anchor = { x: -14, z: -129, rotation: 0.18 };
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.potato;
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.dirtRoad, 0.13, 'GATE4D_Potato_Farm_Stand_Service_Court', rotation, 'gate4d-potato-footprint', 5.0);
    stats.pads += 1;

    const farmStand = point(0, 0);
    if (this.addPolishAsset(group, 'EnvPolishPotatoFarmStand', farmStand[0], farmStand[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-potato-farm-stand', 'GATE4D_Potato_Farm_Stand_Architecture', farmStand[0], farmStand[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.farmStandBuildings += 1;
      stats.greenhouseBodies += 1;
      stats.produceCounters += 1;
      stats.integratedCropRows += 5;
      stats.farmRows += 5;
      stats.irrigationTanks += 1;
      stats.irrigationRuns += 1;
      stats.counterStands += 1;
      stats.greenhouseAtriums += 1;
      stats.greenhouseRoofRidges += 1;
      stats.cropCourtFrames += 1;
      stats.waterTowers += 1;
      stats.fieldOffices += 1;
      stats.routeFarmFacades += 1;
      stats.routeProducePortals += 1;
      stats.routeGreenhouseFrames += 1;
      stats.routeGlassPanelBreakups += 1;
      stats.routeProduceCounterRhythms += 1;
      stats.routeHarvestGates += 1;
      stats.routeCropRowLanes += 6;
      stats.routeProduceCarts += 1;
      stats.routePotatoCrates += 3;
      stats.routePotatoCrests += 1;
      stats.greenhouseMarketHalls += 1;
      stats.harvestAtriums += 1;
      stats.fieldCanopyFrames += 1;
      stats.seedArchiveTowers += 1;
      stats.harvestBeacons += 1;
      stats.routeSideHarvestCanopies += 1;
      stats.routeSideProduceArcades += 1;
      stats.routeSideIrrigationTowers += 1;
      stats.routeSideCropRibbonRows += 4;
      stats.fenceVisuals += 1;
      stats.fenceSegments += 1;
      stats.crates += 3;
    }

    stats.anchors = stats.irrigationRuns + stats.counterStands;
    stats.signs = 0;
    stats.lamps = 0;
  }

  gate4B2FarmFenceSegment(group, x, z, rotation, name) {
    this.box(group, x - Math.cos(rotation) * 1.45, 0.62, z + Math.sin(rotation) * 1.45, 0.13, 0.9, 0.13, this.world.materials.darkWood, rotation, `${name}_Post_A`);
    this.box(group, x + Math.cos(rotation) * 1.45, 0.62, z - Math.sin(rotation) * 1.45, 0.13, 0.9, 0.13, this.world.materials.darkWood, rotation, `${name}_Post_B`);
    this.box(group, x, 0.86, z, 3.0, 0.1, 0.1, this.world.materials.wood, rotation, `${name}_Rail_Top`);
    this.box(group, x, 0.46, z, 2.8, 0.08, 0.08, this.world.materials.wood, rotation, `${name}_Rail_Low`);
  }

  createGate4B3DataPierSideScaffold() {
    this.gate4b3Stats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE4C_B6_Todo_Planning_Studio';
    this.createGate4B3TodoBoard(group);

    this.gate4b3Stats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4C_B6_todo_planning_studio',
      cellSize: 48,
      shouldSkip: (object) => (
        object.name.endsWith('_Glow')
        || object.material?.transparent
      )
    });
    this.world.scene.add(group);
  }

  createGate4B3TodoBoard(group) {
    const stats = this.gate4b3Stats.todo;
    const zone = findZone('todo');
    const rotation = zone.rotation || 0.24;
    const buildingRotation = rotation + Math.PI / 2;
    const anchor = { x: zone.position[0], z: zone.position[2], rotation };
    const presentation = LANDMARK_PRESENTATION.todo;
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.warmStone, 0.132, 'GATE4D_Todo_Planning_Studio_Service_Court', buildingRotation, 'gate4d-todo-footprint', 5.0);
    stats.pads += 1;

    const studio = point(0, 0.05);
    if (this.addPolishAsset(group, 'EnvPolishTodoPlanningStudio', studio[0], studio[1], buildingRotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-todo-planning-studio', 'GATE4D_Todo_Planning_Studio_Architecture', studio[0], studio[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.planningStudios += 1;
      stats.studioBuildings += 1;
      stats.planningWalls += 1;
      stats.glassWorkrooms += 1;
      stats.scheduleTowers += 1;
      stats.boardWalls += 1;
      stats.studioDesks += 1;
      stats.reviewLanes += 3;
      stats.taskCrates += 1;
      stats.statusPips += 6;
      stats.containedCardStacks += 2;
      stats.groundInlays += 3;
      stats.routeKanbanAtriums += 1;
      stats.routeKanbanColumns += 3;
      stats.planningClockDisks += 1;
      stats.sprintReviewCanopies += 1;
      stats.deliveryLaneTowers += 1;
      stats.productionControlHalls += 1;
      stats.productionControlAtriums += 1;
      stats.backlogArchiveTowers += 1;
      stats.sprintReviewBridges += 1;
      stats.deliveryLaneSpines += 1;
      stats.decisionBeacons += 1;
      stats.routeOperationsCores += 1;
      stats.routeReviewTheaters += 1;
      stats.routeDeliveryBridges += 1;
      stats.routeDecisionBeacons += 1;
      stats.routeSprintBoardGates += 1;
      stats.routeProductionPortals += 1;
      stats.routeDecisionStacks += 1;
      stats.routeBacklogArchiveWings += 2;
      stats.routeDeliverySignalRuns += 1;
      stats.routeSprintBoardFacades += 1;
      stats.routeChecklistSpines += 1;
      stats.routeCalendarCues += 1;
      stats.routePlanningHallGlassFacades += 1;
      stats.routePlanningHallHeaderBridges += 1;
      stats.routePlanningHallSideWings += 2;
      stats.routePlanningEntranceCanopies += 1;
      stats.routeWorkflowMullions += 5;
      stats.queueRails += 3;
    }

    stats.taskBoards = stats.boardWalls;
    stats.taskCards = stats.containedCardStacks + stats.statusPips;
    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4B3DataPier(group) {
  }

  createGate4B4EastSideScaffold() {
    this.gate4b4Stats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE4B4_East_Side_Projects_Career_Harbor';
    this.createGate4B4ProjectsYard(group);
    this.createGate4B4CareerOffice(group);
    this.createGate4B4SignalHarbor(group);

    this.gate4b4Stats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4B4_east_side',
      cellSize: 48,
      shouldSkip: (object) => object.name.endsWith('_Glow')
    });
    this.world.scene.add(group);
  }

  createGate4B4ProjectsYard(group) {
    const stats = this.gate4b4Stats.projects;
    const anchor = { x: 76, z: -28, rotation: -0.34 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.projects;

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.stoneRoad, 0.132, 'GATE4D_Projects_Foundry_Workshop_Plate', rotation, 'gate4d-projects-footprint', 5.0);
    stats.pads += 1;
    stats.groundPlates += 1;

    const foundry = point(0, 0);
    if (this.addPolishAsset(group, 'EnvPolishProjectsFoundryBuilding', foundry[0], foundry[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-projects-foundry-building', 'GATE4D_Projects_Foundry_Building_Architecture', foundry[0], foundry[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.foundryBuildings += 1;
      stats.workshopShells += 1;
      stats.buildGantries += 1;
      stats.displayBays += 3;
      stats.testBenches += 1;
      stats.cableTrays += 1;
      stats.projectRacks += 3;
      stats.forgePortals += 1;
      stats.furnaceChimneys += 1;
      stats.sawtoothRoofs += 1;
      stats.craneBridges += 1;
      stats.publicGalleries += 1;
      stats.routeFacades += 1;
      stats.warmFacadeBands += 6;
      stats.publicBuildTheaters += 1;
      stats.showcaseProjectPods += 3;
      stats.compilePipelineBridges += 1;
      stats.repoBranchFrames += 2;
      stats.routeBuildCranes += 1;
      stats.routeAssemblyHalls += 1;
      stats.routeCranePortals += 1;
      stats.routeBuildTheaterPortals += 1;
      stats.routeReleasePipelineSpines += 1;
      stats.routeProjectStoryBays += 3;
      stats.routeCompileGantryFrames += 1;
      stats.publicBuildGalleryFrames += 1;
      stats.foundryHeatCores += 1;
      stats.routePublicShowcaseAtriums += 1;
      stats.routeReleaseTheaterScreens += 1;
      stats.routePrototypeGalleryPods += 3;
      stats.routeCompilePipelineStages += 4;
      stats.routeBuildReviewBalconies += 1;
      stats.routeReleaseGantryFrames += 1;
      stats.routePrototypeLaunchPortals += 1;
      stats.routeBuildReviewCourts += 1;
      stats.routeDeployBeaconStacks += 1;
      stats.routeRepositoryAtriumFaces += 1;
      stats.routeBuildPipelineRunways += 1;
      stats.routePrototypeReviewWindows += 3;
      stats.routeReleaseCraneCrowns += 1;
      stats.routePublicBuildForecourts += 1;
      stats.routeVehicleScaleBuildArches += 1;
      stats.routeOpenWorkshopDoors += 1;
      stats.routeReleaseReviewBays += 3;
    }

    stats.assemblyRings = stats.foundryBuildings;
  }

  createGate4B4CareerOffice(group) {
    const stats = this.gate4b4Stats.career;
    const anchor = { x: 82, z: -46, rotation: -0.24 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.career;

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.warmStone, 0.132, 'GATE4D_Career_Software_House_Campus_Plate', rotation, 'gate4d-career-footprint', 5.0);
    stats.pads += 1;

    const placeSource = (assetName, kind, name, right, forward, assetRotation, scale, statName, minClearance = 5.0) => {
      const position = point(right, forward);
      if (this.addPolishAsset(group, assetName, position[0], position[1], assetRotation, scale)) {
        this.recordGate3RPlacement(kind, name, position[0], position[1], { minClearance });
        stats.sourceAssets += 1;
        stats[statName] += 1;
        return position;
      }
      return null;
    };

    placeSource('EnvPolishCareerSoftwareHouse', 'gate4d-career-software-house', 'GATE4D_Career_Software_House_Architecture', 0, 0.25, rotation, presentation.scale, 'softwareHouseBuildings', 5.0);
    if (stats.softwareHouseBuildings > 0) {
      stats.architectureAssets += 1;
      stats.buildingShells += 1;
      stats.glassFacades += 1;
      stats.entranceCanopies += 1;
      stats.experienceWalls += 1;
      stats.lobbyGlows += 1;
      stats.campusAtriums += 1;
      stats.deliveryTowers += 1;
      stats.engineeringTowers += 1;
      stats.collaborationWings += 1;
      stats.productBoardrooms += 1;
      stats.codeFacades += 1;
      stats.campusPromenades += 1;
      stats.interviewPods += 5;
      stats.officeFloorBands += 4;
      stats.roadsideLobbyWings += 1;
      stats.campusGatewayFrames += 1;
      stats.teamAtriumBeacons += 1;
      stats.campusArrivalPlazas += 1;
      stats.routeHiringPortalFrames += 1;
      stats.routeTeamBoardrooms += 1;
      stats.routeDeliverySprintLanes += 4;
      stats.routeCodeReviewFacades += 1;
      stats.routeArrivalCourts += 1;
      stats.routeHiringArcades += 1;
      stats.routeReviewTheaters += 1;
      stats.routeCandidateFlowSteps += 5;
      stats.routeTeamPortals += 1;
      stats.routeForecourtWings += 2;
      stats.routeSoftwareHouseThresholds += 1;
      stats.routeTeamReviewBays += 2;
      stats.routeDeliveryFlowBars += 4;
      stats.routeCampusEntryBeacons += 2;
      stats.routeArrivalBoulevards += 2;
      stats.routeReceptionCanopies += 1;
      stats.routeHiringReviewPavilions += 2;
      stats.routeTeamFlowBridges += 1;
      stats.routeSprintBeaconStacks += 2;
    }

    const path = point(0, -7.25);
    this.box(group, path[0], 0.154, path[1], 7.8, 0.018, 0.42, this.world.materials.paleStone, rotation, 'GATE4D_Career_Campus_Entry_Axis');
    this.recordGate3RPlacement('gate4d-career-entry-axis', 'GATE4D_Career_Campus_Entry_Axis', path[0], path[1], { minClearance: 5.0 });
    stats.servicePaths += 1;

    stats.officeBlocks = stats.buildingShells;
    stats.facadePanels = 1;
    stats.signalFrames = stats.entranceCanopies + stats.lobbyGlows;
    stats.connectorMarks = 0;
  }

  createGate4B4SignalHarbor(group) {
    const stats = this.gate4b4Stats.harbor;
    const anchor = { x: 127, z: 13, rotation: -0.34 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.harbor;

    const deck = point(1, 3);
    this.gate3rPad(group, deck[0], deck[1], presentation.padWidth, presentation.padDepth, this.world.materials.paleStone, 0.132, 'GATE4D_Signal_Harbor_Communications_Service_Deck', rotation, 'gate4d-harbor-footprint', 4.8);
    stats.deckPads += 1;
    stats.deckPlatforms += 1;

    const station = point(1, 3.05);
    if (this.addPolishAsset(group, 'EnvPolishSignalHarborCommunicationsStation', station[0], station[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-harbor-communications-station', 'GATE4D_Signal_Harbor_Communications_Station_Architecture', station[0], station[1], { minClearance: 4.8 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.communicationsStations += 1;
      stats.operationsHalls += 1;
      stats.glassRelayRooms += 1;
      stats.antennaServiceWings += 1;
      stats.broadcastTowers += 1;
      stats.dishArrays += 1;
      stats.sideServiceFacades += 1;
      stats.routeFacades += 1;
      stats.signalCrowns += 1;
      stats.contactTerminalRooms += 1;
      stats.publicContactPortals += 1;
      stats.publicChannelBays += 3;
      stats.messageBeaconWalls += 1;
      stats.relayCrownArrays += 1;
      stats.shoreDishSilhouettes += 1;
      stats.roadsideContactFacades += 1;
      stats.contactGatewayPortals += 1;
      stats.messageExchangeAtriums += 1;
      stats.channelBeaconMasts += 3;
      stats.inboxBeaconWalls += 1;
      stats.routeContactExchangeHalls += 1;
      stats.routeInboxOutboxFrames += 2;
      stats.routeChannelSpines += 4;
      stats.routeMessageFlowTicks += 6;
      stats.routePublicSignalGateways += 1;
      stats.routeInboxOutboxTowers += 2;
      stats.routeMessageBridgeSpans += 1;
      stats.routeSignalCrownArrays += 1;
      stats.routeContactBeaconSpines += 1;
      stats.routeContactForecourts += 1;
      stats.routeMessageLanes += 5;
      stats.routeExchangeDesks += 3;
      stats.routeContactEnvelopeArches += 1;
      stats.routeExchangeCanopies += 1;
      stats.routeSignalQueuePylons += 3;
      stats.routeContactArrivalConcourses += 1;
      stats.routeConcourseEdges += 2;
      stats.routeContactQueueSteps += 4;
      stats.routePublicSignalArrivalThresholds += 1;
      stats.routeVehicleMessagePortals += 1;
      stats.routeContactSignalWindows += 1;
      stats.routeMessageArrivalBays += 3;
      stats.signalMasts += 1;
      stats.relayMasts += 1;
      stats.contactTerminals += 3;
      stats.githubTerminals += 1;
      stats.linkedinTerminals += 1;
      stats.emailTerminals += 1;
      stats.beacons += 2;
      stats.beaconPulses += 2;
    }

    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4B5NorthRidgeScaffold() {
    this.gate4b5Stats.enabled = true;

    const group = new THREE.Group();
    group.name = 'GATE4B5_North_Ridge_Awards_Sentinel_Circuit';
    this.createGate4B5AwardsArchive(group);
    this.createGate4B5SentinelRidge(group);
    this.createGate4B5CircuitGate(group);

    this.gate4b5Stats.staticBatches = mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4B5_north_ridge',
      cellSize: 46,
      shouldSkip: (object) => object.name.endsWith('_Glow')
    });
    this.world.scene.add(group);
  }

  createGate4B5AwardsArchive(group) {
    const stats = this.gate4b5Stats.awards;
    const anchor = { x: -58, z: 116, rotation: -0.18 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.awards;

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.paleStone, 0.132, 'GATE4D_Awards_Museum_Hall_Ceremonial_Ground', rotation, 'gate4d-awards-footprint', 5.2);
    stats.pads += 1;
    stats.galleryBases += 1;

    const museum = point(0, 0.05);
    if (this.addPolishAsset(group, 'EnvPolishAwardsMuseumHall', museum[0], museum[1], rotation, presentation.scale)) {
      stats.authoredAssets += 1;
      stats.sourceAssets += 1;
      stats.architectureAssets += 1;
      stats.museumHalls += 1;
      stats.plaqueWalls += 1;
      stats.trophyPlinths += 3;
      stats.goldAccents += 3;
      stats.warmAccents += 3;
      stats.certificateFrames += 6;
      stats.archiveSteps += 4;
      stats.ceremonialSteps += 4;
      stats.routeTrophyAtriums += 1;
      stats.routeMedalCrowns += 1;
      stats.routeCertificateGalleries += 1;
      stats.routeHonorsEntryAxes += 1;
      stats.routeHonorsBoulevards += 1;
      stats.routeMedalGates += 1;
      stats.routeTrophyRotundas += 1;
      stats.routeCeremonialCrowns += 1;
      stats.routeHonorsForecourts += 1;
      stats.routeCeremonialWalks += 1;
      stats.routeHonorsThresholds += 1;
      stats.routeHonorsArrivalArches += 1;
      stats.routeHonorsMedalWindows += 1;
      stats.routeCertificateFriezes += 2;
    }
    this.recordGate3RPlacement('gate4d-awards-museum-hall', 'GATE4D_Awards_Museum_Hall_Architecture', museum[0], museum[1], { minClearance: 4.8 });

    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4B5SentinelRidge(group) {
    const stats = this.gate4b5Stats.sentinel;
    const anchor = { x: 10, z: 129, rotation: -0.12 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.sentinel;

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.securityRoad, 0.132, 'GATE4D_Sentinel_SOC_Tower_Service_Plate', rotation, 'gate4d-sentinel-footprint', 5.2);
    stats.pads += 1;
    stats.groundPlates += 1;

    const socTower = point(0, 0);
    if (this.addPolishAsset(group, 'EnvPolishSentinelSocTower', socTower[0], socTower[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-sentinel-soc-tower', 'GATE4D_Sentinel_SOC_Tower_Architecture', socTower[0], socTower[1], { minClearance: 5.0 });
      stats.sourceAssets += 1;
      stats.authoredAssets += 1;
      stats.architectureAssets += 1;
      stats.socTowers += 1;
      stats.ridgeTowers += 1;
      stats.operationsHalls += 1;
      stats.glassOpsRooms += 1;
      stats.towerBases += 1;
      stats.scannerCrowns += 1;
      stats.alertWalls += 1;
      stats.serverRacks += 4;
      stats.shardPanels += 4;
      stats.packetShardPanels += 4;
      stats.perimeterPylons += 2;
      stats.shieldGateFrames += 1;
      stats.threatIntelMasts += 1;
      stats.blueTeamBridges += 1;
      stats.commandCatwalks += 1;
      stats.routeShieldAtriums += 1;
      stats.incidentResponseHalls += 1;
      stats.scannerBridges += 1;
      stats.overwatchDecks += 1;
      stats.solidCommandWings += 1;
      stats.commandWindowBands += 1;
      stats.scanPortalFrames += 1;
      stats.threatWalls += 1;
      stats.commandCampusScaleMarkers += 1;
      stats.routeShieldPortals += 1;
      stats.overwatchTowerSilhouettes += 1;
      stats.commandTowerSilhouettes += 1;
      stats.routeCommandFacades += 1;
      stats.routeShieldCrests += 1;
      stats.routeThreatBoards += 1;
      stats.routeStatusLanes += 1;
      stats.routeOpsPortals += 1;
      stats.routeWarRooms += 1;
      stats.routeWarRoomCommandDesks += 1;
      stats.routePacketQueueRails += 5;
      stats.routeDefenseCanopies += 1;
      stats.routeEntryPorticos += 1;
      stats.routeEntryWarRoomGlass += 1;
      stats.routeShieldThresholdArches += 1;
      stats.routeSocFrontageWings += 2;
      stats.routeInspectionLaneMarks += 5;
      stats.routeThreatIntelCrowns += 1;
      stats.routeCommandBeaconMasts += 1;
    }

    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4B5CircuitGate(group) {
    const stats = this.gate4b5Stats.circuit;
    const anchor = { x: 58, z: 76, rotation: -0.28 };
    const point = (right, forward) => this.gate4B1Point(anchor, right, forward);
    const rotation = anchor.rotation;
    const presentation = LANDMARK_PRESENTATION.circuit;

    this.gate3rPad(group, anchor.x, anchor.z, presentation.padWidth, presentation.padDepth, this.world.materials.stuntRamp, 0.132, 'GATE4D_Circuit_Time_Trial_Service_Court', rotation, 'gate4d-circuit-footprint', 5.2);
    stats.pads += 1;

    const gate = point(0, 0);
    if (this.addPolishAsset(group, 'EnvPolishCircuitTimeTrialGate', gate[0], gate[1], rotation, presentation.scale)) {
      this.recordGate3RPlacement('gate4d-circuit-time-trial-gate', 'GATE4D_Circuit_Time_Trial_Gate_Architecture', gate[0], gate[1], { minClearance: 5.0 });
      stats.authoredAssets += 1;
      stats.sourceAssets += 1;
      stats.architectureAssets += 1;
      stats.timeTrialGates += 1;
      stats.launchLanes += 1;
      stats.startGates += 1;
      stats.startGantries += 1;
      stats.timingControlRooms += 1;
      stats.timingBooths += 1;
      stats.timePylons += 1;
      stats.raceControlTowers += 1;
      stats.scoreboards += 1;
      stats.grandstands += 1;
      stats.timingFacades += 1;
      stats.checkpointCrowns += 1;
      stats.pitWallFacades += 1;
      stats.signalLights += 3;
      stats.startLights += 3;
      stats.checkpointMarkers += 1;
      stats.routeArrows += 2;
      stats.laneCurbs += 2;
      stats.pocketCurbVisuals += 2;
      stats.overheadCheckpointPortals += 1;
      stats.lapClockDisks += 1;
      stats.startLightTrees += 1;
      stats.raceControlBridges += 1;
      stats.pitWallRhythms += 1;
      stats.checkeredTimingPanels += 12;
      stats.routeRaceControlPorticos += 1;
      stats.routeDriveThroughTunnels += 1;
      stats.routeControlCabins += 2;
      stats.routeLapSignalStacks += 1;
      stats.routeCheckpointLaneFrames += 3;
      stats.routeApproachTimingPortals += 1;
      stats.routeTimingRibbonWalls += 1;
      stats.routeApproachControlCabins += 2;
      stats.routeApproachLapSignalStacks += 1;
      stats.routeApproachCheckpointLaneFrames += 3;
      stats.routeStarterArcades += 1;
      stats.routeSplitTimerBlades += 1;
      stats.routeCountdownTrees += 1;
      stats.routeCheckeredCrowns += 1;
      stats.routeRecoveryRailRuns += 2;
    }

    stats.signs = 0;
    stats.lamps = 0;
  }

  createGate4ERouteCompositionPass() {
    const group = new THREE.Group();
    group.name = 'GATE4E_Route_Composition_Pass';

    const placements = [
      { name: 'Launch_Run_Left_Frame', asset: 'EnvPolishRouteVistaKit', path: 'coastal-loop', segment: 0, t: 0.42, lateral: -8.6, scale: 0.72, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'Campus_Boulevard_South_Story', asset: 'EnvPolishRouteStoryMarker', path: 'campus-boulevard', segment: 1, t: 0.48, lateral: -8.2, scale: 0.68, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'Campus_Boulevard_FCC_Approach_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'campus-boulevard', segment: 3, t: 0.58, lateral: 8.6, scale: 0.72, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Security_Spur_Entry_Vista', asset: 'EnvPolishRouteVistaKit', path: 'security-spur', segment: 0, t: 0.52, lateral: -8.2, scale: 0.7, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'Security_Spur_Exit_Bollards', asset: 'EnvPolishChevronBollardRun', path: 'security-spur', segment: 1, t: 0.52, lateral: -8.0, scale: 0.66, stat: 'bollardRuns', footprint: [5.8, 2.2] },
      { name: 'Security_Spur_Field_Story', asset: 'EnvPolishRouteStoryMarker', path: 'security-spur', segment: 1, t: 0.78, lateral: -8.4, scale: 0.66, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'Gallery_Run_Splitter_Frame', asset: 'EnvPolishRouteSplitterIsland', path: 'coastal-loop', segment: 1, t: 0.45, lateral: -8.8, scale: 0.7, stat: 'splitterIslands', footprint: [4.4, 3.2] },
      { name: 'Gallery_Run_Plaza_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'coastal-loop', segment: 2, t: 0.48, lateral: -9.0, scale: 0.7, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Harbor_Approach_Vista', asset: 'EnvPolishRouteVistaKit', path: 'coastal-loop', segment: 3, t: 0.62, lateral: -8.7, scale: 0.68, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'North_Ridge_Signal_Spire', asset: 'EnvPolishSignalSpire', path: 'coastal-loop', segment: 5, t: 0.45, lateral: -8.8, scale: 0.5, stat: 'signalSpires', footprint: [3.2, 3.2] },
      { name: 'Awards_Ridge_Story_Marker', asset: 'EnvPolishRouteStoryMarker', path: 'coastal-loop', segment: 6, t: 0.52, lateral: -8.6, scale: 0.66, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'FCC_West_Loop_Splitter', asset: 'EnvPolishRouteSplitterIsland', path: 'coastal-loop', segment: 8, t: 0.42, lateral: -9.2, scale: 0.66, stat: 'splitterIslands', footprint: [4.4, 3.2] },
      { name: 'South_Run_Vista', asset: 'EnvPolishRouteVistaKit', path: 'coastal-loop', segment: 10, t: 0.5, lateral: 8.4, scale: 0.68, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'Behind_Run_Bollard_Frame', asset: 'EnvPolishChevronBollardRun', path: 'coastal-loop', segment: 11, t: 0.48, lateral: 9.2, scale: 0.66, stat: 'bollardRuns', footprint: [5.8, 2.2] },
      { name: 'Farm_Service_Lantern', asset: 'EnvPolishRouteLantern', path: 'farm-service', segment: 0, t: 0.44, lateral: 9.5, scale: 0.62, stat: 'routeLanterns', footprint: [2.2, 2.2] },
      { name: 'Farm_Service_Plaza_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'farm-service', segment: 0, t: 0.72, lateral: 9.5, scale: 0.66, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Launch_Run_Right_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'coastal-loop', segment: 0, t: 0.78, lateral: 8.8, scale: 0.66, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Projects_Foundry_Approach_Bollards', asset: 'EnvPolishChevronBollardRun', path: 'coastal-loop', segment: 2, t: 0.22, lateral: 8.8, scale: 0.64, stat: 'bollardRuns', footprint: [5.8, 2.2] },
      { name: 'Projects_Foundry_Approach_Story', asset: 'EnvPolishRouteStoryMarker', path: 'coastal-loop', segment: 2, t: 0.74, lateral: -8.8, scale: 0.64, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'Signal_Harbor_Roadside_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'coastal-loop', segment: 3, t: 0.32, lateral: -9.2, scale: 0.64, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Signal_Harbor_Return_Lantern', asset: 'EnvPolishRouteLantern', path: 'coastal-loop', segment: 4, t: 0.48, lateral: -8.6, scale: 0.58, stat: 'routeLanterns', footprint: [2.2, 2.2] },
      { name: 'Circuit_Race_Control_Bollards', asset: 'EnvPolishChevronBollardRun', path: 'coastal-loop', segment: 5, t: 0.18, lateral: 8.6, scale: 0.62, stat: 'bollardRuns', footprint: [5.8, 2.2] },
      { name: 'Sentinel_Ridge_Story_Marker', asset: 'EnvPolishRouteStoryMarker', path: 'coastal-loop', segment: 6, t: 0.44, lateral: 8.8, scale: 0.62, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'Awards_Campus_Signal_Spire', asset: 'EnvPolishSignalSpire', path: 'coastal-loop', segment: 7, t: 0.28, lateral: 9.4, scale: 0.48, stat: 'signalSpires', footprint: [3.2, 3.2] },
      { name: 'FCC_Boulevard_Exit_Bollards', asset: 'EnvPolishChevronBollardRun', path: 'campus-boulevard', segment: 3, t: 0.32, lateral: -8.4, scale: 0.62, stat: 'bollardRuns', footprint: [5.8, 2.2] },
      { name: 'Campus_Boulevard_Mid_Vista', asset: 'EnvPolishRouteVistaKit', path: 'campus-boulevard', segment: 2, t: 0.7, lateral: 9.2, scale: 0.62, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'Campus_Boulevard_Mid_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'campus-boulevard', segment: 2, t: 0.25, lateral: 9.2, scale: 0.62, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Campus_Boulevard_Mid_Lantern', asset: 'EnvPolishRouteLantern', path: 'campus-boulevard', segment: 2, t: 0.5, lateral: 9.2, scale: 0.58, stat: 'routeLanterns', footprint: [2.2, 2.2] },
      { name: 'Skills_Service_Route_Vista', asset: 'EnvPolishRouteVistaKit', path: 'coastal-loop', segment: 10, t: 0.42, lateral: -8.8, scale: 0.64, stat: 'vistaKits', footprint: [4.8, 3.4] },
      { name: 'CV_Archive_Arrival_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'coastal-loop', segment: 11, t: 0.35, lateral: -8.6, scale: 0.64, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Behind_Build_Approach_Story', asset: 'EnvPolishRouteStoryMarker', path: 'coastal-loop', segment: 1, t: 0.2, lateral: -8.2, scale: 0.62, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] },
      { name: 'Potato_Service_Field_Edge', asset: 'EnvPolishPlazaEdgeKit', path: 'farm-service', segment: 0, t: 0.7, lateral: -8.8, scale: 0.62, stat: 'plazaEdgeKits', footprint: [5.2, 2.8] },
      { name: 'Potato_Service_Story_Marker', asset: 'EnvPolishRouteStoryMarker', path: 'farm-service', segment: 0, t: 0.9, lateral: -12.5, scale: 0.6, stat: 'routeStoryMarkers', footprint: [3.4, 2.8] }
    ];

    for (const spec of placements) this.addGate4ERouteCompositionAsset(group, spec);

    mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4E_route_composition',
      cellSize: 72
    });
    group.userData.routeCompositionStats = { ...this.routeCompositionStats };
    this.registerQualityGroup(group, this.world.gate4ePrimaryRouteDiscoveryMode ? 'primary' : 'secondary');
    this.registerBroadSetPieceBatches('routeComposition', group, 'GATE4E_route_composition', 'routeCompositionRadius');
    this.world.scene.add(group);
  }

  addGate4ERouteCompositionAsset(group, spec) {
    const point = this.routeCompositionPoint(spec.path, spec.segment, spec.t, spec.lateral);
    if (!point) return false;
    const rotation = point.rotation + (spec.rotationOffset || 0);
    const placed = this.addRouteCompositionAsset(group, spec.asset, point.x, point.z, rotation, spec.scale, spec.stat);
    if (!placed) return false;

    this.routeCompositionStats.gate4eRouteAnchors += 1;
    if (spec.path === 'coastal-loop') this.routeCompositionStats.coastalLoopStaging += 1;
    this.recordGate3RPlacement('gate4e-route-composition', `GATE4E_${spec.name}`, point.x, point.z, { minClearance: spec.minClearance || 3.6 });
    if (spec.footprint) {
      const [width, depth] = spec.footprint;
      this.recordGate3RFootprintPlacement(
        'gate4e-route-composition-footprint',
        `GATE4E_${spec.name}_Footprint`,
        point.x,
        point.z,
        width * spec.scale,
        depth * spec.scale,
        rotation,
        spec.footprintClearance || 2.7
      );
    }
    return true;
  }

  createGate4ELaunchHubCompositionPass() {
    this.gate4eLaunchHubStats.enabled = true;

    const zone = findZone('landing');
    const group = new THREE.Group();
    group.name = 'GATE4E_Launch_Hub_Composition';
    const rotation = zone.rotation || 0;

    const place = (assetName, name, x, z, assetRotation, scale, statName, footprint, minClearance = 3.0) => {
      const placed = this.addPolishAsset(group, assetName, x, z, assetRotation, scale);
      if (!placed) return false;
      this.gate4eLaunchHubStats.sourceAssets += 1;
      this.gate4eLaunchHubStats.authoredAssets += 1;
      this.gate4eLaunchHubStats[statName] = (this.gate4eLaunchHubStats[statName] || 0) + 1;
      this.recordGate3RPlacement('gate4e-launch-hub', `GATE4E_${name}`, x, z, { minClearance });
      if (footprint) {
        const [width, depth] = footprint;
        this.recordGate3RFootprintPlacement(
          'gate4e-launch-hub-footprint',
          `GATE4E_${name}_Footprint`,
          x,
          z,
          width * scale,
          depth * scale,
          assetRotation,
          minClearance
        );
      }
      return true;
    };

    place('EnvPolishLaunchHubGateway', 'LaunchHubGateway', 13.8, -90.8, rotation, 0.94, 'gatewayAssets', [16.8, 12.8], 3.1);
    this.gate4eLaunchHubStats.routeFacingFacades += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.arrivalPortals += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.driveUnderCanopies += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.destinationTiles += this.gate4eLaunchHubStats.gatewayAssets * 3;
    this.gate4eLaunchHubStats.firstFrameForecourts += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.routeThresholdCanopies += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.forecourtSideWalls += this.gate4eLaunchHubStats.gatewayAssets * 2;
    this.gate4eLaunchHubStats.destinationBandCues += this.gate4eLaunchHubStats.gatewayAssets * 6;
    this.gate4eLaunchHubStats.worldEntryPortals += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.routeEntrySignalFrames += this.gate4eLaunchHubStats.gatewayAssets;
    this.gate4eLaunchHubStats.portfolioThresholdPanels += this.gate4eLaunchHubStats.gatewayAssets * 3;

    mergeStaticMeshesInGroup(group, {
      namePrefix: 'GATE4E_launch_hub',
      cellSize: 48
    });
    this.registerQualityGroup(group, this.world.gate4ePrimaryRouteDiscoveryMode ? 'primary' : 'secondary');
    this.registerBroadSetPieceBatches('launchHub', group, 'GATE4E_launch_hub', 'routeCompositionRadius');
    this.world.scene.add(group);
  }

  routeCompositionPoint(pathId, segmentIndex, t, lateral) {
    const path = findPath(pathId);
    const points = path.points || [];
    const segmentCount = path.closed ? points.length : points.length - 1;
    if (segmentCount <= 0) return null;
    const index = THREE.MathUtils.clamp(Math.floor(segmentIndex), 0, segmentCount - 1);
    const [ax, az] = points[index];
    const [bx, bz] = points[(index + 1) % points.length];
    const progress = THREE.MathUtils.clamp(t, 0, 1);
    const dx = bx - ax;
    const dz = bz - az;
    const rotation = Math.atan2(dx, dz);
    const x = ax + dx * progress + Math.cos(rotation) * lateral;
    const z = az + dz * progress - Math.sin(rotation) * lateral;
    return { x, z, rotation };
  }

  createGate4DLifeInteractionPass() {
    this.gate4dLifeStats.enabled = true;
    const group = new THREE.Group();
    group.name = 'GATE4D_Life_Interaction_Pass';
    const anchors = [
      { id: 'cv', x: -36, z: -88, rotation: 0.12, color: 0xe6f3ff, kind: 'archive' },
      { id: 'behind', x: 35, z: -76, rotation: 0.08, color: 0xa8a6ff, kind: 'garage' },
      { id: 'skills', x: -94, z: -84, rotation: 0.24, color: 0x92ffea, kind: 'terminal' },
      { id: 'potato', x: -14, z: -129, rotation: 0.18, color: 0xc79b56, kind: 'farm' },
      { id: 'todo', x: -96, z: 4, rotation: 0.24 + Math.PI / 2, color: 0xd8ff92, kind: 'planning' },
      { id: 'projects', x: 76, z: -28, rotation: -0.34, color: 0xffcc66, kind: 'foundry' },
      { id: 'career', x: 82, z: -46, rotation: -0.24, color: 0xb6a0ff, kind: 'office' },
      { id: 'contact', x: 127, z: 13, rotation: -0.34, color: 0x78b7ff, kind: 'signal' },
      { id: 'awards', x: -58, z: 116, rotation: -0.18, color: 0xffdf8a, kind: 'museum' },
      { id: 'sentinel', x: 10, z: 129, rotation: -0.12, color: 0xff6d8d, kind: 'soc' },
      { id: 'circuit', x: 58, z: 76, rotation: -0.28, color: 0xff9b6d, kind: 'time-trial' }
    ].map((anchor) => ({
      ...anchor,
      scale: LANDMARK_PRESENTATION[anchor.id]?.scale || LANDMARK_PRESENTATION.harbor.scale
    }));
    this.gate4dLifeStats.activeLandmarks = anchors.length;

    for (const anchor of anchors) {
      this.addGate4DLifeWindowGlow(group, anchor, 0, -2.4, 2.35, 4.4, anchor.kind === 'signal' ? 0.16 : 0.18, 'primary');
      this.addGate4DLifeTerminalPulse(group, anchor, 4.2, -4.4, 1.35, 'primary');
    }

    this.addGate4DLifeGallerySweep(group, anchors.find((item) => item.id === 'cv'), 0, -1.9, 2.75, 5.6, 'primary');
    this.addGate4DLifeGallerySweep(group, anchors.find((item) => item.id === 'awards'), 0, -2.0, 2.45, 5.2, 'primary');
    this.addGate4DLifeGallerySweep(group, anchors.find((item) => item.id === 'projects'), -1.4, -2.4, 2.65, 4.8, 'secondary');

    this.addGate4DLifeSignalPulse(group, anchors.find((item) => item.id === 'contact'), 0.8, 3.1, 4.8, 3.2, 'primary');
    this.addGate4DLifeSignalPulse(group, anchors.find((item) => item.id === 'sentinel'), 0, 1.7, 6.0, 2.7, 'primary');
    this.addGate4DLifeSignalPulse(group, anchors.find((item) => item.id === 'circuit'), 0, 2.8, 3.4, 2.4, 'primary');

    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'contact'), [
      [-3.2, -2.0, 2.2, 0.58],
      [-1.1, -2.3, 2.65, 0.52],
      [1.1, -2.1, 2.42, 0.5],
      [3.1, -1.7, 2.82, 0.46]
    ], 'primary');
    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'potato'), [
      [-4.8, -2.1, 2.04, 0.52],
      [-2.6, -2.4, 2.48, 0.48],
      [1.2, -1.6, 1.62, 0.46],
      [4.6, -0.8, 1.42, 0.44]
    ], 'primary');
    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'circuit'), [
      [-4.6, -1.8, 2.12, 0.52],
      [-2.1, -2.1, 2.58, 0.46],
      [0.6, -2.0, 2.3, 0.44],
      [3.4, -1.5, 2.74, 0.42]
    ], 'primary');

    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'todo'), [
      [-3.6, -2.6, 1.78, 0.78],
      [-1.5, -2.2, 1.92, 0.72],
      [0.6, -1.8, 1.7, 0.68],
      [2.7, -1.2, 1.86, 0.64],
      [4.8, -0.7, 1.66, 0.6]
    ], 'primary');
    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'projects'), [
      [-3.8, 2.7, 2.1, 0.68],
      [-1.2, 3.0, 2.28, 0.62],
      [1.4, 2.5, 2.02, 0.58],
      [3.8, 2.0, 2.22, 0.55]
    ], 'secondary');
    this.addGate4DLifeContainedMotions(group, anchors.find((item) => item.id === 'cv'), [
      [-3.1, 2.8, 1.9, 0.64],
      [-0.6, 3.0, 2.08, 0.58],
      [1.9, 2.7, 1.82, 0.54]
    ], 'secondary');

    this.world.scene.add(group);
  }

  gate4DLifePoint(anchor, right, forward) {
    const scale = anchor.scale || 1;
    return [
      anchor.x + Math.cos(anchor.rotation) * right * scale + Math.sin(anchor.rotation) * forward * scale,
      anchor.z - Math.sin(anchor.rotation) * right * scale + Math.cos(anchor.rotation) * forward * scale
    ];
  }

  addGate4DLifeWindowGlow(group, anchor, right, forward, y, width, opacity, tier) {
    if (!anchor) return null;
    const [x, z] = this.gate4DLifePoint(anchor, right, forward);
    const material = this.gate4DLifeMaterial(anchor.color, opacity);
    const scale = anchor.scale || 1;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width * scale, 0.34 * scale, 0.045), material);
    mesh.name = `GATE4D_Life_WindowGlow_${anchor.id}`;
    mesh.position.set(x, y * scale, z);
    mesh.rotation.y = anchor.rotation;
    mesh.renderOrder = 30;
    group.add(mesh);
    this.recordGate3RPlacement('gate4d-life-window-glow', mesh.name, x, z, { minClearance: 4.0 });
    this.registerGate4DLifeItem({ mesh, role: 'windowGlows', tier, baseOpacity: opacity, opacityRange: 0.06, speed: 0.72, phase: this.gate4dLifeItems.length * 0.47, baseY: y * scale, baseScale: 1, range: 0.028 });
    return mesh;
  }

  addGate4DLifeTerminalPulse(group, anchor, right, forward, scale, tier) {
    if (!anchor) return null;
    const [x, z] = this.gate4DLifePoint(anchor, right, forward);
    const material = this.gate4DLifeMaterial(anchor.color, 0.22);
    material.side = THREE.DoubleSide;
    const anchorScale = anchor.scale || 1;
    const mesh = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.08, 6), material);
    mesh.name = `GATE4D_Life_TerminalPulse_${anchor.id}`;
    mesh.position.set(x, 0.255, z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = anchor.rotation;
    mesh.scale.setScalar(scale * anchorScale);
    mesh.renderOrder = 42;
    group.add(mesh);
    this.recordGate3RPlacement('gate4d-life-terminal-pulse', mesh.name, x, z, { minClearance: 3.8 });
    this.registerGate4DLifeItem({ mesh, role: 'terminalPulses', tier, baseOpacity: 0.18, opacityRange: 0.08, speed: 0.95, phase: this.gate4dLifeItems.length * 0.51, baseScale: scale * anchorScale, range: 0.11, rotationSpeed: 0.28 });
    return mesh;
  }

  addGate4DLifeGallerySweep(group, anchor, right, forward, y, width, tier) {
    if (!anchor) return null;
    const [x, z] = this.gate4DLifePoint(anchor, right, forward);
    const material = this.gate4DLifeMaterial(anchor.color, 0.24);
    const anchorScale = anchor.scale || 1;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(width * anchorScale, 0.09 * anchorScale, 0.05), material);
    mesh.name = `GATE4D_Life_GallerySweep_${anchor.id}`;
    mesh.position.set(x, y * anchorScale, z);
    mesh.rotation.y = anchor.rotation;
    mesh.renderOrder = 31;
    group.add(mesh);
    this.recordGate3RPlacement('gate4d-life-gallery-sweep', mesh.name, x, z, { minClearance: 4.0 });
    this.registerGate4DLifeItem({ mesh, role: 'gallerySweeps', tier, baseOpacity: 0.16, opacityRange: 0.1, speed: 0.58, phase: this.gate4dLifeItems.length * 0.63, baseY: y * anchorScale, baseScale: 1, range: 0.075 });
    return mesh;
  }

  addGate4DLifeSignalPulse(group, anchor, right, forward, y, scale, tier) {
    if (!anchor) return null;
    const [x, z] = this.gate4DLifePoint(anchor, right, forward);
    const material = this.gate4DLifeMaterial(anchor.color, 0.2);
    material.side = THREE.DoubleSide;
    const anchorScale = anchor.scale || 1;
    const mesh = new THREE.Mesh(new THREE.RingGeometry(0.92, 1.18, 28), material);
    mesh.name = `GATE4D_Life_SignalPulse_${anchor.id}`;
    mesh.position.set(x, y * anchorScale, z);
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = anchor.rotation;
    mesh.scale.setScalar(scale * anchorScale);
    mesh.renderOrder = 43;
    group.add(mesh);
    this.recordGate3RPlacement('gate4d-life-signal-pulse', mesh.name, x, z, { minClearance: 4.0 });
    this.registerGate4DLifeItem({ mesh, role: 'signalPulses', tier, baseOpacity: 0.16, opacityRange: 0.09, speed: 0.7, phase: this.gate4dLifeItems.length * 0.41, baseScale: scale * anchorScale, range: 0.13, rotationSpeed: 0.2 });
    return mesh;
  }

  addGate4DLifeContainedMotions(group, anchor, specs, tier) {
    if (!anchor) return;
    for (let index = 0; index < specs.length; index += 1) {
      const [right, forward, y, scale] = specs[index];
      const [x, z] = this.gate4DLifePoint(anchor, right, forward);
      const material = this.gate4DLifeMaterial(anchor.color, 0.44);
      const anchorScale = anchor.scale || 1;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.82 * scale * anchorScale, 0.48 * scale * anchorScale, 0.045), material);
      mesh.name = `GATE4D_Life_ContainedMotion_${anchor.id}_${index}`;
      mesh.position.set(x, y * anchorScale, z);
      mesh.rotation.y = anchor.rotation + (index - specs.length * 0.5) * 0.06;
      mesh.renderOrder = 33;
      group.add(mesh);
      this.recordGate3RPlacement('gate4d-life-contained-motion', mesh.name, x, z, { minClearance: 3.8 });
      this.registerGate4DLifeItem({
        mesh,
        role: 'containedMotions',
        tier,
        baseOpacity: 0.34,
        opacityRange: 0.1,
        speed: 0.54 + index * 0.05,
        phase: this.gate4dLifeItems.length * 0.55,
        baseY: y * anchorScale,
        bob: 0.16,
        baseRotation: mesh.rotation.y,
        rotationRange: 0.08,
        baseScale: 1,
        range: 0.03
      });
    }
  }

  gate4DLifeMaterial(color, opacity) {
    return new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }

  registerGate4DLifeItem(item) {
    item.kind = 'gate4dLife';
    item.active = true;
    this.gate4dLifeItems.push(item);
    this.animated.push(item);
    this.gate4dLifeStats[item.role] += 1;
  }

  updateGate4DLifeItem(item, elapsed) {
    if (item.active === false || item.mesh.visible === false) return;
    const phase = elapsed * item.speed + item.phase;
    if (item.role === 'containedMotions') {
      item.mesh.position.y = item.baseY + Math.sin(phase) * item.bob;
      item.mesh.rotation.y = item.baseRotation + Math.sin(phase * 0.8) * item.rotationRange;
      const scale = item.baseScale + Math.sin(phase * 1.3) * item.range;
      item.mesh.scale.setScalar(scale);
    } else if (item.role === 'windowGlows' || item.role === 'gallerySweeps') {
      const scale = item.baseScale + Math.sin(phase * 1.2) * item.range;
      item.mesh.scale.set(1 + scale * 0.04, 1, 1);
      item.mesh.position.y = item.baseY + Math.sin(phase * 0.7) * 0.025;
    } else {
      const scale = item.baseScale + Math.sin(phase) * item.range;
      item.mesh.scale.setScalar(scale);
      item.mesh.rotation.z += item.rotationSpeed * 0.016;
    }
    item.mesh.material.opacity = item.baseOpacity + Math.sin(phase) * item.opacityRange;
    this.gate4dLifeStats.motionSamples += 1;
  }

  applyGate4DLifeQuality() {
    const quality = this.world.landscapeQuality;
    const visibleStats = {
      visibleTotal: 0,
      visibleWindowGlows: 0,
      visibleTerminalPulses: 0,
      visibleGallerySweeps: 0,
      visibleSignalPulses: 0,
      visibleContainedMotions: 0
    };
    for (const item of this.gate4dLifeItems) {
      const visible = quality !== 'low' || item.tier === 'primary';
      item.active = visible;
      item.mesh.visible = visible;
      if (!visible) continue;
      visibleStats.visibleTotal += 1;
      const statName = `visible${item.role[0].toUpperCase()}${item.role.slice(1)}`;
      visibleStats[statName] += 1;
    }
    Object.assign(this.gate4dLifeStats, visibleStats);
  }

  gate4B1Point(anchor, right, forward) {
    return [
      anchor.x + Math.cos(anchor.rotation) * right + Math.sin(anchor.rotation) * forward,
      anchor.z - Math.sin(anchor.rotation) * right + Math.cos(anchor.rotation) * forward
    ];
  }

  distancePointToSegment2d(px, pz, ax, az, bx, bz) {
    const abx = bx - ax;
    const abz = bz - az;
    const lengthSq = abx * abx + abz * abz;
    if (lengthSq <= 0.0001) return Math.hypot(px - ax, pz - az);
    const t = THREE.MathUtils.clamp(((px - ax) * abx + (pz - az) * abz) / lengthSq, 0, 1);
    const cx = ax + abx * t;
    const cz = az + abz * t;
    return Math.hypot(px - cx, pz - cz);
  }

  gate3rDistanceToRoad(x, z) {
    let bestDistance = Infinity;
    let bestRoad = 'none';
    let bestHalfWidth = 0;
    let bestX = x;
    let bestZ = z;
    for (const path of roadPaths) {
      const points = path.points || [];
      const segmentCount = path.closed ? points.length : points.length - 1;
      for (let index = 0; index < segmentCount; index += 1) {
        const [ax, az] = points[index];
        const [bx, bz] = points[(index + 1) % points.length];
        const abx = bx - ax;
        const abz = bz - az;
        const lengthSq = abx * abx + abz * abz;
        const t = lengthSq <= 0.0001
          ? 0
          : THREE.MathUtils.clamp(((x - ax) * abx + (z - az) * abz) / lengthSq, 0, 1);
        const closestX = ax + abx * t;
        const closestZ = az + abz * t;
        const distance = Math.hypot(x - closestX, z - closestZ);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestRoad = path.id;
          bestHalfWidth = (path.width || 4) * 0.5;
          bestX = closestX;
          bestZ = closestZ;
        }
      }
    }
    return {
      roadId: bestRoad,
      distance: Number(bestDistance.toFixed(3)),
      clearance: Number((bestDistance - bestHalfWidth).toFixed(3)),
      closestX: Number(bestX.toFixed(3)),
      closestZ: Number(bestZ.toFixed(3))
    };
  }

  gate3rFootprintSamples(x, z, width, depth, rotation) {
    const halfW = width * 0.5;
    const halfD = depth * 0.5;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const samples = [[0, 0]];
    for (const side of [-1, 1]) {
      samples.push([side * halfW, 0], [0, side * halfD]);
      for (const forward of [-1, 1]) samples.push([side * halfW, forward * halfD]);
    }
    return samples.map(([right, forward]) => [
      x + right * cos + forward * sin,
      z - right * sin + forward * cos
    ]);
  }

  recordGate3RPlacement(kind, name, x, z, options = {}) {
    const stats = this.gate3rPlacementStats;
    const measurement = this.gate3rDistanceToRoad(x, z);
    if (options.allowRoad) {
      stats.intentionalRoadOverlays += 1;
      return;
    }

    const minClearance = options.minClearance ?? GATE3R_DEFAULT_PROP_CLEARANCE;
    const pass = measurement.clearance >= minClearance;
    stats.recorded += 1;
    stats.byKind[kind] = (stats.byKind[kind] || 0) + 1;
    stats.minClearance = stats.minClearance === null
      ? measurement.clearance
      : Math.min(stats.minClearance, measurement.clearance);
    if (!pass) stats.roadIntrusions += 1;
    stats.entries.push({
      kind,
      name,
      x: Number(x.toFixed(2)),
      z: Number(z.toFixed(2)),
      roadId: measurement.roadId,
      clearance: measurement.clearance,
      minClearance,
      pass
    });
  }

  gate3rLamp(group, x, z, color, height, name, rotation, minClearance = GATE3R_DEFAULT_PROP_CLEARANCE) {
    this.addLamp(group, x, z, color, height, name, rotation);
    this.recordGate3RPlacement('lamp', name, x, z, { minClearance });
  }

  gate3rLampFacingRoad(group, x, z, color, height, name, minClearance = 1.75) {
    const measurement = this.gate3rDistanceToRoad(x, z);
    const rotation = Math.atan2(z - measurement.closestZ, measurement.closestX - x);
    this.gate3rLamp(group, x, z, color, height, name, rotation, minClearance);
  }

  gate3rSign(group, title, subtitle, x, z, rotation, color, scale, name, minClearance = GATE3R_DEFAULT_PROP_CLEARANCE) {
    this.addSign(group, title, subtitle, x, z, rotation, color, scale, name);
    this.recordGate3RPlacement('sign', name, x, z, { minClearance });
  }

  recordGate3RFootprintPlacement(kind, name, x, z, width, depth, rotation, minClearance) {
    const stats = this.gate3rPlacementStats;
    const samples = this.gate3rFootprintSamples(x, z, width, depth, rotation);
    const measurements = samples.map(([sampleX, sampleZ]) => this.gate3rDistanceToRoad(sampleX, sampleZ));
    const worst = measurements.reduce((lowest, current) => (
      current.clearance < lowest.clearance ? current : lowest
    ), measurements[0]);
    const maxRadius = Math.max(...samples.map(([sampleX, sampleZ]) => Math.hypot(sampleX, sampleZ)));
    const grassClearance = ISLAND_RADIUS * 0.88 - maxRadius;
    const pass = worst.clearance >= minClearance;
    stats.recordedFootprints += 1;
    stats.byFootprintKind[kind] = (stats.byFootprintKind[kind] || 0) + 1;
    stats.maxFootprintRadius = Math.max(stats.maxFootprintRadius || 0, maxRadius);
    stats.minFootprintClearance = stats.minFootprintClearance === null
      ? worst.clearance
      : Math.min(stats.minFootprintClearance, worst.clearance);
    if (!pass) stats.footprintIntrusions += 1;
    if (grassClearance < 0) stats.shorelineFootprintIntrusions += 1;
    stats.entries.push({
      kind,
      name,
      footprint: true,
      x: Number(x.toFixed(2)),
      z: Number(z.toFixed(2)),
      width: Number(width.toFixed(2)),
      depth: Number(depth.toFixed(2)),
      roadId: worst.roadId,
      clearance: worst.clearance,
      minClearance,
      maxRadius: Number(maxRadius.toFixed(3)),
      grassClearance: Number(grassClearance.toFixed(3)),
      pass
    });
  }

  gate3rPad(group, x, z, width, depth, material, y, name, rotation, kind, minClearance = 1.8) {
    const mesh = this.slicePad(group, x, z, width, depth, material, y, name, rotation);
    this.recordGate3RFootprintPlacement(kind, name, x, z, width, depth, rotation, minClearance);
    return mesh;
  }

  createGate3RStartHub(group) {
    const zone = findZone('landing');
    const stats = this.verticalSliceStats.start;
    const rotation = zone.rotation || 0;
    const centerX = 2.2;
    const centerZ = -108.4;
    const local = (right, forward) => {
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      return [centerX + right * cos + forward * sin, centerZ - right * sin + forward * cos];
    };

    const markY = 0.137;

    const scuffMaterial = this.sliceOverlayMaterial(0x181a14, 0.12);
    for (let side = -1; side <= 1; side += 2) {
      for (let index = 0; index < 3; index += 1) {
        const [x, z] = local(side * (0.78 + index * 0.16), 0.48 + index * 0.7);
        this.box(
          group,
          x,
          markY + 0.006 + index * 0.0004,
          z,
          0.14,
          0.014,
          1.05 + index * 0.16,
          scuffMaterial,
          rotation + side * (0.035 + index * 0.008),
          'GATE3R_Start_Burnout_Witness'
        );
        this.recordGate3RPlacement('road-overlay', 'GATE3R_Start_Burnout_Witness', x, z, { allowRoad: true });
        stats.burnoutScuffs += 1;
      }
    }

    const lampA = local(-12, 14);
    const lampB = local(14, -4);
    this.gate3rLampFacingRoad(group, lampA[0], lampA[1], 0xffc36a, 2.8, 'GATE3R_Start_Lamp_Left', 2.2);
    this.gate3rLampFacingRoad(group, lampB[0], lampB[1], 0x7cffb2, 2.8, 'GATE3R_Start_Lamp_Right', 2.2);
    stats.lamps += 2;

    if (this.world.gate4eLaunchHubMode) {
      this.gate4eLaunchHubStats.legacySignsSuppressed += 2;
    } else {
      const startSign = local(20, -4);
      const routeSign = local(-24, 4);
      this.gate3rSign(group, 'START', 'Campus route', startSign[0], startSign[1], rotation - 0.82, 0x7cffb2, 1.6, 'GATE3R_Start_Sign', 3.4);
      this.gate3rSign(group, 'FCC / SCAN', 'One clean road', routeSign[0], routeSign[1], rotation + 0.68, 0x9ccfff, 1.55, 'GATE3R_Start_Route_Sign', 3.4);
      stats.signs += 2;
    }
  }

  createGate3RCampusRoute(group) {
    const stats = this.verticalSliceStats.campusRoute;
    const path = findPath('campus-boulevard');
    this.createGate3RRouteRun(group, path, stats, {
      prefix: 'GATE3R_CampusRoute',
      color: 0x9ccfff,
      accentMaterial: this.world.materials.glowBlue,
      kind: 'campus',
      side: 1,
      lampSpacing: 42,
      lampSetback: 2.1,
      firstLampAt: 32
    });
    this.gate3rSign(group, 'FCCU', 'Education Grove', -83, 43.5, -0.48, 0x9ccfff, 1.58, 'GATE3R_CampusRoute_Sign', 4.2);
    stats.signs += 1;
  }

  createGate3RFccGrove(group) {
    const zone = findZone('education');
    const stats = this.verticalSliceStats.fcc;
    const x = zone.position[0];
    const z = zone.position[2];
    const rotation = zone.rotation || 0;
    const local = (right, forward) => {
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      return [x + right * cos + forward * sin, z - right * sin + forward * cos];
    };

    this.recordGate3RFootprintPlacement('protected-landmark', 'GATE3R_FCC_Protected_Model_Footprint', x, z, 22, 16, rotation, 4.5);
    const forecourt = local(0, -9.4);
    const entryWalk = local(0, -5.8);
    this.gate3rPad(group, forecourt[0], forecourt[1], 15.4, 4.4, this.world.materials.paleStone, 0.13, 'GATE3R_FCC_Forecourt', rotation, 'fcc-walk', 4.5);
    this.gate3rPad(group, entryWalk[0], entryWalk[1], 6.4, 2.8, this.world.materials.warmStone, 0.132, 'GATE3R_FCC_Entry_Walk', rotation, 'fcc-walk', 4.5);
    stats.plazaPads += 2;

    const lampA = local(-9.5, -14.6);
    const lampB = local(9.5, -14.6);
    this.gate3rLampFacingRoad(group, lampA[0], lampA[1], 0x9ccfff, 2.9, 'GATE3R_FCC_Lamp_Left', 2.2);
    this.gate3rLampFacingRoad(group, lampB[0], lampB[1], 0x9ccfff, 2.9, 'GATE3R_FCC_Lamp_Right', 2.2);
    stats.lamps += 2;

    const sign = local(-12.4, -16.2);
    this.gate3rSign(group, 'FCCU S BLOCK', 'Education stop', sign[0], sign[1], rotation + 0.2, 0x9ccfff, 1.62, 'GATE3R_FCC_Identity_Sign', 3.8);
    stats.signs += 1;
  }

  createGate3RSecurityRoute(group) {
    const stats = this.verticalSliceStats.securityRoute;
    const path = findPath('security-spur');
    this.createGate3RRouteRun(group, path, stats, {
      prefix: 'GATE3R_SecurityRoute',
      color: 0x68d8ff,
      accentMaterial: this.world.materials.glowBlue,
      kind: 'security',
      side: -1,
      warningSpacing: 16,
      warningSetback: 8.8,
      firstWarningAt: 13
    });
    this.gate3rSign(group, 'SECURITY', 'Scanner gate', -70.5, -30.4, -0.82, 0x68d8ff, 1.54, 'GATE3R_SecurityRoute_Sign', 3.6);
    stats.signs += 1;
  }

  createGate3RSecurityLab(group) {
    const zone = findZone('security');
    const stats = this.verticalSliceStats.security;
    const scan = this.securityScanPose(zone);
    const sideX = Math.cos(scan.rotation);
    const sideZ = -Math.sin(scan.rotation);
    const forwardX = Math.sin(scan.rotation);
    const forwardZ = Math.cos(scan.rotation);
    const point = (side, forward) => [
      scan.x + sideX * side + forwardX * forward,
      scan.z + sideZ * side + forwardZ * forward
    ];
    const architectureMode = this.world.gate4eCybersecurityCraftMode;

    this.gate3rPad(group, scan.x, scan.z, 12.4, 5.2, this.world.materials.securityRoad, 0.131, 'GATE3R_Security_Scanner_Lane', scan.rotation, 'security-pad', 8);
    const serviceDecks = architectureMode
      ? [
          [5.7, 4.6, 3.8, 3.2, 'GATE4E_Security_Left_Service_Shoulder'],
          [-5.7, 4.6, 3.8, 3.2, 'GATE4E_Security_Right_Service_Shoulder']
        ]
      : [
          [10.8, -5.4, 5.2, 4.2, 'GATE3R_Security_Server_Deck_A'],
          [-10.8, 5.4, 5.2, 4.2, 'GATE3R_Security_Server_Deck_B']
        ];
    for (const [side, forward, width, depth, name] of serviceDecks) {
      this.gate3rPad(group, ...point(side, forward), width, depth, this.world.materials.stoneRoad, 0.132, name, scan.rotation, 'security-pad', 8);
    }
    stats.floorPads += 3;

    const [labX, labZ] = point(0, architectureMode ? 8.6 : 7.8);
    const gateAsset = architectureMode ? 'EnvPolishSecurityOperationsGate' : 'EnvSecurityGate';
    if (this.addPolishAsset(group, gateAsset, labX, labZ, scan.rotation, architectureMode ? 1.08 : 1.05)) {
      this.recordGate3RPlacement('security-operations-gate', 'GATE4E_Security_Operations_Gate_Architecture', labX, labZ, { minClearance: 5.0 });
      this.securityLabStats.authoredAssets += 1;
      this.securityLabStats.architectureAssets += 1;
      this.securityLabStats.operationsGates += 1;
      if (gateAsset === 'EnvPolishSecurityOperationsGate') {
        this.securityLabStats.sourceAssets += 1;
        this.securityLabStats.routeShieldAtriums += 1;
        this.securityLabStats.incidentResponseHalls += 1;
        this.securityLabStats.scannerBridges += 1;
        this.securityLabStats.commandDecks += 1;
        this.securityLabStats.operationsCampusScaleMarkers += 1;
        this.securityLabStats.routeScanPortals += 1;
        this.securityLabStats.threatWatchTowers += 1;
        this.securityLabStats.commandCampuses += 1;
        this.securityLabStats.routeAccessControlCores += 1;
        this.securityLabStats.routeShieldDoorFrames += 1;
        this.securityLabStats.routeIncidentCommandScreens += 1;
        this.securityLabStats.routePacketInspectionLanes += 4;
        this.securityLabStats.routeSocEntryVestibules += 1;
        this.securityLabStats.routeScanCanopies += 1;
        this.securityLabStats.routeTriageDesks += 1;
        this.securityLabStats.routeClearancePillars += 4;
        this.securityLabStats.routePacketQueueTicks += 6;
        this.securityLabStats.routeCampusArrivalArches += 1;
        this.securityLabStats.routeCommandFrontages += 1;
        this.securityLabStats.routeThreatWatchTowers += 1;
        this.securityLabStats.routeIncidentResponseWings += 1;
        this.securityLabStats.routeShieldCourts += 1;
        this.securityLabStats.routeOperationsThresholds += 1;
        this.securityLabStats.routeScanCanopyBridges += 1;
        this.securityLabStats.routeThreatReviewGalleries += 1;
        this.securityLabStats.routeAccessReviewBays += 4;
        this.securityLabStats.routeScanStatusBands += 6;
      }
    }

    this.securityScanWaveField(group, scan.x, scan.z, scan.rotation);
    this.createGate3RSecurityPackets(group, zone, scan);

    for (const forward of [-2.1, 2.1]) {
      const [x, z] = point(0, forward);
      this.box(group, x, 0.139, z, 5.6, 0.018, 0.14, this.world.materials.glowBlue, scan.rotation, 'GATE3R_Security_Scan_Threshold');
      stats.lightStrips += 1;
      this.securityLabStats.floorMarks += 1;
    }

    for (const side of [-1, 1]) {
      const [railX, railZ] = point(side * 4.35, 0);
      this.box(group, railX, 0.34, railZ, 0.14, 0.22, 4.9, this.world.materials.cable, scan.rotation, 'GATE3R_Security_Lane_Rail');
      this.recordGate3RPlacement('scanner-boundary', 'GATE3R_Security_Lane_Rail', railX, railZ, { minClearance: 2.2 });
      stats.terminalRails += 1;
      this.securityLabStats.terminalRails += 1;
    }

    const serverCores = architectureMode
      ? [
          [-5.9, 5.2, -0.04],
          [-4.1, 6.0, -0.02],
          [4.1, 6.0, 0.02],
          [5.9, 5.2, 0.04]
        ]
      : [
          [9.6, -6.4, 0.16],
          [12.5, -4.4, 0.08],
          [-9.6, 6.4, -0.16],
          [-12.5, 4.4, -0.08]
        ];
    for (const [side, forward, rot] of serverCores) {
      const [rackX, rackZ] = point(side, forward);
      if (architectureMode) {
        this.box(group, rackX, 0.88, rackZ, 0.64, 1.52, 0.74, this.world.materials.cable, scan.rotation + rot, 'GATE4E_Security_Integrated_Server_Core');
        this.box(group, rackX, 1.19, rackZ, 0.68, 0.12, 0.78, this.world.materials.glowBlue, scan.rotation + rot, 'GATE4E_Security_Integrated_Server_Status');
      } else {
        this.serverRack(group, rackX, rackZ, scan.rotation + rot);
      }
      this.recordGate3RPlacement('security-rack', 'GATE3R_Security_Server_Rack', rackX, rackZ, { minClearance: 2.2 });
      stats.serverBlocks += 1;
    }

    const cableRuns = architectureMode
      ? [
          [point(4.9, 4.6), point(4.2, 2.2), point(4.35, 0)],
          [point(-4.9, 4.6), point(-4.2, 2.2), point(-4.35, 0)]
        ]
      : [
          [point(8.2, -5.4), point(6.3, -2.8), point(4.35, 0)],
          [point(-8.2, 5.4), point(-6.3, 2.8), point(-4.35, 0)]
        ];
    for (const run of cableRuns) {
      this.cable(
        group,
        [run[0][0], 0.24, run[0][1]],
        [run[1][0], 0.23, run[1][1]],
        [run[2][0], 0.24, run[2][1]],
        0x10191f
      );
      stats.cables += 1;
      this.securityLabStats.cableRuns += 1;
    }

    const beacons = architectureMode
      ? [
          [5.9, -2.8, 0x68d8ff],
          [-5.9, -2.8, 0x68d8ff]
        ]
      : [
          [15, -2, 0x68d8ff],
          [-15, 2, 0x68d8ff]
        ];
    for (const [side, forward, color] of beacons) {
      const [x, z] = point(side, forward);
      this.beacon(group, x, z, color);
      this.recordGate3RPlacement('security-beacon', 'GATE3R_Security_Beacon', x, z, { minClearance: 2.2 });
      stats.beacons += 1;
    }

    for (const [side, forward] of [
      [1, -3.2],
      [-1, -3.2],
      [1, 3.2],
      [-1, 3.2]
    ]) {
      const [x, z] = point(side * 4.8, forward);
      this.cylinder(group, x, 0.5, z, 0.12, 0.92, this.world.materials.cable, 8, 'GATE3R_Security_Warning_Bollard');
      this.box(group, x, 0.98, z, 0.32, 0.12, 0.12, this.world.materials.glowBlue, scan.rotation, 'GATE3R_Security_Warning_Light');
      this.recordGate3RPlacement('scanner-boundary', 'GATE3R_Security_Warning_Bollard', x, z, { minClearance: 2.2 });
      stats.warningBollards += 1;
    }

    if (!architectureMode) {
      const sign = point(16, -7);
      this.gate3rSign(group, 'SECURITY SCAN', 'Hold in beam', sign[0], sign[1], scan.rotation - 0.95, 0x68d8ff, 1.56, 'GATE3R_Security_Scan_Sign', 2.8);
      stats.signs += 1;
    }
  }

  createGate3RRouteRun(group, path, stats, spec) {
    const points = path.points || [];
    const side = spec.side || 1;
    const lampOffset = (path.width || 4) * 0.5 + (path.shoulder || 0.8) + (spec.lampSetback || 4.2);
    const warningOffset = (path.width || 4) * 0.5 + (path.shoulder || 0.8) + (spec.warningSetback || 3.8);
    let travelled = 0;
    let nextLampAt = spec.firstLampAt ?? 28;
    let nextWarningAt = spec.firstWarningAt ?? 14;

    for (let segmentIndex = 0; segmentIndex < points.length - 1; segmentIndex += 1) {
      const [ax, az] = points[segmentIndex];
      const [bx, bz] = points[segmentIndex + 1];
      const dx = bx - ax;
      const dz = bz - az;
      const length = Math.hypot(dx, dz);
      const rotation = Math.atan2(dx, dz);
      const rightX = Math.cos(rotation);
      const rightZ = -Math.sin(rotation);

      if (Number.isFinite(spec.lampSpacing)) {
        while (nextLampAt < travelled + length) {
          const t = (nextLampAt - travelled) / length;
          const x = ax + dx * t;
          const z = az + dz * t;
          const lampX = x + rightX * side * lampOffset;
          const lampZ = z + rightZ * side * lampOffset;
          this.gate3rLampFacingRoad(group, lampX, lampZ, spec.color, 2.55, `${spec.prefix}_Lamp`, 1.75);
          stats.lamps = (stats.lamps || 0) + 1;
          nextLampAt += spec.lampSpacing;
        }
      }

      if (Number.isFinite(spec.warningSpacing)) {
        while (nextWarningAt < travelled + length) {
          const t = (nextWarningAt - travelled) / length;
          const x = ax + dx * t;
          const z = az + dz * t;
          const propX = x + rightX * side * warningOffset;
          const propZ = z + rightZ * side * warningOffset;
          this.cylinder(group, propX, 0.46, propZ, 0.095, 0.84, this.world.materials.cable, 8, `${spec.prefix}_Warning_Bollard`);
          this.box(group, propX, 0.91, propZ, 0.26, 0.1, 0.1, spec.accentMaterial, rotation, `${spec.prefix}_Warning_Light`);
          this.recordGate3RPlacement('warning-bollard', `${spec.prefix}_Warning_Bollard`, propX, propZ, { minClearance: 3.0 });
          stats.warningBollards += 1;
          stats.lightStrips += 1;
          nextWarningAt += spec.warningSpacing;
        }
      }

      travelled += length;
    }
  }

  createGate3RSecurityPackets(group, zone, scan) {
    const sideX = Math.cos(scan.rotation);
    const sideZ = -Math.sin(scan.rotation);
    const forwardX = Math.sin(scan.rotation);
    const forwardZ = Math.cos(scan.rotation);
    for (let index = 0; index < 8; index += 1) {
      const side = index % 2 ? -1 : 1;
      const forward = -3.6 + Math.floor(index / 2) * 1.75;
      const baseSide = side * (7.4 + (index % 3) * 0.28);
      const packetMaterial = this.world.materials.glowBlue.clone();
      packetMaterial.transparent = true;
      packetMaterial.depthWrite = false;
      packetMaterial.opacity = 0.42;
      const packet = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0), packetMaterial);
      packet.name = 'SecurityPacketShard';
      packet.visible = false;
      packet.position.set(
        scan.x + sideX * baseSide + forwardX * forward,
        1.12 + (index % 3) * 0.18,
        scan.z + sideZ * baseSide + forwardZ * forward
      );
      group.add(packet);
      this.animated.push({
        kind: 'securityPacket',
        mesh: packet,
        baseX: packet.position.x,
        baseY: packet.position.y,
        baseZ: packet.position.z,
        baseOpacity: 0.42,
        scanX: scan.x,
        scanZ: scan.z,
        orbitRadius: 2.85 + (index % 3) * 0.36,
        orbitSpeed: 1.45 + index * 0.08,
        speed: 1.18,
        phase: index * 0.72,
        range: 0.3,
        rotationSpeed: 1.0 + index * 0.06
      });
      this.securityScanStats.packetShards += 1;
    }
  }

  securityScanPose(zone) {
    return {
      x: zone.position[0] + SECURITY_SCAN_OFFSET[0],
      z: zone.position[2] + SECURITY_SCAN_OFFSET[1],
      rotation: SECURITY_SCAN_ROTATION
    };
  }

  slicePad(group, x, z, width, depth, material, y, name, rotation = 0) {
    const geometry = new THREE.PlaneGeometry(width, depth);
    geometry.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geometry, this.sliceSurfaceMaterial(material));
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.receiveShadow = true;
    mesh.renderOrder = 5;
    group.add(mesh);
    return mesh;
  }

  sliceSurfaceMaterial(material) {
    const key = material.uuid;
    if (this.sliceSurfaceMaterials.has(key)) return this.sliceSurfaceMaterials.get(key);
    const clone = material.clone();
    clone.polygonOffset = true;
    clone.polygonOffsetFactor = -4;
    clone.polygonOffsetUnits = -4;
    this.sliceSurfaceMaterials.set(key, clone);
    return clone;
  }

  sliceOverlayMaterial(color, opacity) {
    const key = `${color}:${opacity}`;
    if (this.sliceOverlayMaterials.has(key)) return this.sliceOverlayMaterials.get(key);
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -72,
      polygonOffsetUnits: -72
    });
    this.sliceOverlayMaterials.set(key, material);
    return material;
  }

  createGate3StartHub(group) {
    const zone = findZone('landing');
    const stats = this.verticalSliceStats.start;
    const rotation = zone.rotation || 0;
    this.slicePad(group, zone.position[0] + 2.8, zone.position[2] - 8.5, 20, 10.5, this.world.materials.plazaRoad, 0.204, 'GATE3_Start_LaunchCourt', rotation);
    this.slicePad(group, zone.position[0] - 6, zone.position[2] + 7.2, 14, 5.6, this.world.materials.paleStone, 0.202, 'GATE3_Start_Rear_Promenade', rotation + 0.08);
    stats.launchPads += 2;

    this.box(group, zone.position[0] + 2.8, 0.238, zone.position[2] - 13.8, 13, 0.035, 0.3, this.world.materials.glow, rotation, 'GATE3_Start_Glow_StartLine');
    this.box(group, zone.position[0] - 8.0, 0.236, zone.position[2] - 8.5, 0.22, 0.035, 7.4, this.world.materials.glowBlue, rotation, 'GATE3_Start_Glow_LeftRail');
    this.box(group, zone.position[0] + 13.6, 0.236, zone.position[2] - 8.5, 0.22, 0.035, 7.4, this.world.materials.warmGlow, rotation, 'GATE3_Start_Glow_RightRail');
    stats.routeMarks += 3;

    for (let index = 0; index < 5; index += 1) {
      const offset = -5.2 + index * 2.6;
      this.box(group, zone.position[0] + 2.5 + offset, 0.252, zone.position[2] - 13.15, 0.82, 0.045, 0.32, index % 2 ? this.world.materials.glowBlue : this.world.materials.warmGlow, rotation, 'GATE3_Start_LaunchLight');
      stats.launchLights += 1;
    }

    const scuffMaterial = this.sliceOverlayMaterial(0x17140f, 0.22);
    for (let side = -1; side <= 1; side += 2) {
      for (let index = 0; index < 3; index += 1) {
        this.box(
          group,
          zone.position[0] + 2.5 + side * (1.6 + index * 0.22),
          0.248 + index * 0.0004,
          zone.position[2] - 10.2 + index * 1.08,
          0.22 + index * 0.03,
          0.018,
          1.45 + index * 0.22,
          scuffMaterial,
          rotation + side * (0.04 + index * 0.012),
          'GATE3_Start_BurnoutScuff'
        );
        stats.burnoutScuffs += 1;
      }
    }

    this.addLamp(group, zone.position[0] - 15.5, zone.position[2] - 12.5, 0xffc36a, 3.1, 'GATE3_Start_Lamp_Warm');
    this.addLamp(group, zone.position[0] + 15.5, zone.position[2] - 10.5, 0x7cffb2, 3.0, 'GATE3_Start_Lamp_Mint');
    this.addLamp(group, zone.position[0] - 10, zone.position[2] + 10, 0x68d8ff, 2.9, 'GATE3_Start_Lamp_Blue');
    stats.lamps += 3;

    this.addPlanterCluster(group, zone.position[0] - 17.5, zone.position[2] + 2.5, 0x7cffb2);
    this.addPlanterCluster(group, zone.position[0] + 17.5, zone.position[2] + 2.0, 0x68d8ff);
    stats.planters += 2;

    this.addSign(group, 'START', 'Launch Plaza', zone.position[0] + 16.2, zone.position[2] + 7.8, -0.88, 0x7cffb2, 2.15, 'GATE3_Start_Sign');
    this.addSign(group, 'FCC / SCAN', 'Route split ahead', zone.position[0] - 20.5, zone.position[2] + 11.8, 0.78, 0x9ccfff, 2.0, 'GATE3_Start_Route_Sign');
    stats.signs += 2;

    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishInfoKiosk', zone.position[0] + 11.0, zone.position[2] - 1.5, -0.72, 0.68));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishChevronBollardRun', zone.position[0] + 2.5, zone.position[2] - 16.0, Math.PI * 0.5, 0.72));
  }

  createGate3CampusRoute(group) {
    const stats = this.verticalSliceStats.campusRoute;
    const points = [
      [0, 28],
      [-42, 34],
      [-56, 56],
      [-58, 72],
      [-48, 96]
    ];
    this.createGate3RoadsideRun(group, points, stats, {
      prefix: 'GATE3_CampusRoute',
      color: 0x9ccfff,
      accentMaterial: this.world.materials.glowBlue,
      bedMaterial: this.world.materials.paleStone,
      hedgeMaterial: this.world.materials.meadowDark,
      kind: 'campus'
    });
    this.campusArch(group, -54, 64, -0.45);
    this.campusArch(group, -46, 94, 0.55);
    this.addSign(group, 'FCCU', 'Education Grove', -48, 53, -0.44, 0x9ccfff, 1.85, 'GATE3_CampusRoute_Sign');
    stats.arches += 2;
    stats.signs += 1;
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishRouteLantern', -39, 38, -0.34, 0.68));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishBenchPlanter', -62, 70, -0.12, 0.58));
  }

  createGate3FccGrove(group) {
    const zone = findZone('education');
    const stats = this.verticalSliceStats.fcc;
    const x = zone.position[0];
    const z = zone.position[2];
    this.slicePad(group, x, z - 13, 31, 11.5, this.world.materials.plazaRoad, 0.214, 'GATE3_FCC_Front_Plaza', 0.02);
    this.slicePad(group, x - 15.5, z - 1, 4.2, 17, this.world.materials.paleStone, 0.212, 'GATE3_FCC_Left_Walk', -0.04);
    this.slicePad(group, x + 16.5, z - 1, 4.2, 17, this.world.materials.paleStone, 0.212, 'GATE3_FCC_Right_Walk', 0.04);
    this.slicePad(group, x, z + 10.5, 21, 6.5, this.world.materials.paleStone, 0.21, 'GATE3_FCC_Rear_Walk', 0);
    stats.plazaPads += 4;

    for (const dx of [-19, -7, 7, 19]) {
      this.addLamp(group, x + dx, z - 22, 0x9ccfff, 3.2, 'GATE3_FCC_Front_Lamp');
      stats.lamps += 1;
    }
    for (const [bx, bz, rot] of [
      [x - 24, z - 6, 0.84],
      [x - 15, z + 17, -0.62],
      [x + 16, z - 11, -0.38],
      [x + 23, z + 12, 0.48]
    ]) {
      this.addBench(group, bx, bz, rot, 0.92);
      stats.benches += 1;
    }
    for (const [px, pz] of [
      [x - 26, z - 14],
      [x - 21, z + 13],
      [x + 24, z - 12],
      [x + 21, z + 14]
    ]) {
      this.addPlanterCluster(group, px, pz, 0x9ccfff);
      stats.planters += 1;
    }
    this.hedgeLine(group, x - 20, z - 19, 24, 0);
    this.hedgeLine(group, x + 20, z - 19, 24, 0);
    this.hedgeLine(group, x, z + 18, 20, 0);
    stats.hedges += 3;

    this.addSign(group, 'FCCU S BLOCK', 'Protected model identity', x - 19, z - 17.5, 0.2, 0x9ccfff, 2.1, 'GATE3_FCC_Identity_Sign');
    this.box(group, x - 16.5, 0.244, z - 21.0, 8.0, 0.035, 0.28, this.world.materials.glowBlue, 0.04, 'GATE3_FCC_Identity_Frame_Left');
    this.box(group, x + 16.5, 0.244, z - 21.0, 8.0, 0.035, 0.28, this.world.materials.warmGlow, -0.04, 'GATE3_FCC_Identity_Frame_Right');
    stats.signs += 1;
    stats.identityFrames += 2;

    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishCampusWalkwayPavilion', x - 1.4, z - 23.2, 0.05, 0.72));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishCampusFountain', x + 14.8, z - 7.8, -0.12, 0.56));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishCampusNoticeBoard', x - 22.4, z - 8.2, 0.34, 0.6));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishCampusStudyBench', x - 18.2, z + 9.8, 0.52, 0.62));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishCampusStudyBench', x + 18.0, z + 9.6, -0.52, 0.62));
  }

  createGate3SecurityRoute(group) {
    const stats = this.verticalSliceStats.securityRoute;
    const points = [
      [0, 28],
      [-28, 4],
      [-64, -12],
      [-94, -40],
      [-114, -78]
    ];
    this.createGate3RoadsideRun(group, points, stats, {
      prefix: 'GATE3_SecurityRoute',
      color: 0x68d8ff,
      accentMaterial: this.world.materials.glowBlue,
      bedMaterial: this.world.materials.securityRoad,
      hedgeMaterial: this.world.materials.cable,
      kind: 'security'
    });
    this.addSign(group, 'SECURITY', 'Scanner gate ahead', -77, -26, -0.72, 0x68d8ff, 1.85, 'GATE3_SecurityRoute_Sign');
    stats.signs += 1;
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishSignalTotem', -72, -20, -0.45, 0.62));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishRoadBarrier', -101, -48, -0.72, 0.44));
  }

  createGate3SecurityLab(group) {
    const zone = findZone('security');
    const stats = this.verticalSliceStats.security;
    const x = zone.position[0];
    const z = zone.position[2];
    const scan = this.securityScanPose(zone);
    const sideX = Math.cos(scan.rotation);
    const sideZ = -Math.sin(scan.rotation);
    const forwardX = Math.sin(scan.rotation);
    const forwardZ = Math.cos(scan.rotation);
    this.slicePad(group, scan.x, scan.z, 16, 8, this.world.materials.securityRoad, 0.222, 'GATE3_Security_Lab_Floor', scan.rotation);
    this.slicePad(group, scan.x + sideX * 8.4, scan.z + sideZ * 8.4, 6.4, 5.2, this.world.materials.stoneRoad, 0.224, 'GATE3_Security_Server_Deck_West', scan.rotation);
    this.slicePad(group, scan.x - sideX * 8.4, scan.z - sideZ * 8.4, 6.4, 5.2, this.world.materials.stoneRoad, 0.224, 'GATE3_Security_Server_Deck_East', scan.rotation);
    stats.floorPads += 3;

    this.addSign(group, 'SECURITY SCAN', 'Stop inside the beam', scan.x - sideX * 9.4, scan.z - sideZ * 9.4, scan.rotation - 1.1, 0x68d8ff, 1.8, 'GATE3_Security_Scan_Sign');
    stats.signs += 1;

    for (let index = 0; index < 3; index += 1) {
      const offset = -4.2 + index * 4.2;
      this.box(group, scan.x + sideX * offset, 0.258, scan.z + sideZ * offset, 0.8, 0.03, 0.2, index % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue, scan.rotation, 'GATE3_Security_Floor_Trace');
      stats.lightStrips = (stats.lightStrips || 0) + 1;
    }
    for (const side of [-1, 1]) {
      const railX = scan.x + sideX * side * 5.7;
      const railZ = scan.z + sideZ * side * 5.7;
      this.box(group, railX, 0.44, railZ, 0.2, 0.34, 3.8, this.world.materials.cable, scan.rotation, 'GATE3_Security_Terminal_Rail');
      this.box(group, railX - sideX * side * 0.75, 0.59, railZ - sideZ * side * 0.75, 0.12, 0.14, 3.4, this.world.materials.glowBlue, scan.rotation, 'GATE3_Security_Terminal_Glow');
      stats.terminalRails += 2;
      this.securityLabStats.terminalRails += 2;
    }

    for (const [side, forward, extraRotation] of [
      [1, -3.2, 0.24],
      [1, 2.8, 0.08],
      [-1, -2.8, -0.18],
      [-1, 3.2, -0.32],
      [1, 5.8, 0.14],
      [-1, 5.5, -0.14]
    ]) {
      const rx = scan.x + sideX * side * 9.4 + forwardX * forward;
      const rz = scan.z + sideZ * side * 9.4 + forwardZ * forward;
      this.serverRack(group, rx, rz, scan.rotation + extraRotation);
      stats.serverBlocks += 1;
    }

    const cableRuns = [
      [
        [scan.x + sideX * 9.4 + forwardX * -3.2, 0.31, scan.z + sideZ * 9.4 + forwardZ * -3.2],
        [scan.x + sideX * 7.2 + forwardX * -1.6, 0.28, scan.z + sideZ * 7.2 + forwardZ * -1.6],
        [scan.x + sideX * 5.8, 0.31, scan.z + sideZ * 5.8]
      ],
      [
        [scan.x + sideX * 9.4 + forwardX * 2.8, 0.31, scan.z + sideZ * 9.4 + forwardZ * 2.8],
        [scan.x + sideX * 7.2 + forwardX * 1.6, 0.28, scan.z + sideZ * 7.2 + forwardZ * 1.6],
        [scan.x + sideX * 5.8, 0.31, scan.z + sideZ * 5.8]
      ],
      [
        [scan.x - sideX * 9.4 + forwardX * -2.8, 0.31, scan.z - sideZ * 9.4 + forwardZ * -2.8],
        [scan.x - sideX * 7.2 + forwardX * -1.5, 0.28, scan.z - sideZ * 7.2 + forwardZ * -1.5],
        [scan.x - sideX * 5.8, 0.31, scan.z - sideZ * 5.8]
      ],
      [
        [scan.x - sideX * 9.4 + forwardX * 3.2, 0.31, scan.z - sideZ * 9.4 + forwardZ * 3.2],
        [scan.x - sideX * 7.2 + forwardX * 1.7, 0.28, scan.z - sideZ * 7.2 + forwardZ * 1.7],
        [scan.x - sideX * 5.8, 0.31, scan.z - sideZ * 5.8]
      ]
    ];
    for (const run of cableRuns) {
      this.cable(group, run[0], run[1], run[2], 0x10191f);
      stats.cables += 1;
      this.securityLabStats.cableRuns += 1;
    }

    for (const [bx, bz, color] of [
      [scan.x + sideX * 11.8, scan.z + sideZ * 11.8, 0x68d8ff],
      [scan.x - sideX * 11.8, scan.z - sideZ * 11.8, 0xff6d8d],
      [scan.x + forwardX * 6.6, scan.z + forwardZ * 6.6, 0x7cffb2],
      [scan.x - forwardX * 6.6, scan.z - forwardZ * 6.6, 0x68d8ff]
    ]) {
      this.beacon(group, bx, bz, color);
      stats.beacons += 1;
    }

    for (let index = 0; index < 6; index += 1) {
      const side = index % 2 ? -1 : 1;
      const bx = scan.x + sideX * side * 7.0 + forwardX * (-4.2 + index * 1.55);
      const bz = scan.z + sideZ * side * 7.0 + forwardZ * (-4.2 + index * 1.55);
      this.cylinder(group, bx, 0.58, bz, 0.16, 1.12, this.world.materials.cable, 8, 'GATE3_Security_Warning_Bollard');
      this.box(group, bx, 1.22, bz, 0.42, 0.18, 0.16, index % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue, scan.rotation, 'GATE3_Security_Warning_Light');
      stats.warningBollards += 1;
    }

    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishSecurityScanner', scan.x - sideX * 5.8, scan.z - sideZ * 5.8, scan.rotation - 0.16, 0.62));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishTerminalPillar', scan.x + sideX * 8.2 + forwardX * 5.0, scan.z + sideZ * 8.2 + forwardZ * 5.0, scan.rotation + 0.28, 0.62));
    this.recordGate3Asset(this.addPolishAsset(group, 'EnvPolishSignalTotem', scan.x - sideX * 8.2 + forwardX * 4.6, scan.z - sideZ * 8.2 + forwardZ * 4.6, scan.rotation - 0.28, 0.62));
  }

  createGate3RoadsideRun(group, points, stats, spec) {
    for (let segmentIndex = 0; segmentIndex < points.length - 1; segmentIndex += 1) {
      const [ax, az] = points[segmentIndex];
      const [bx, bz] = points[segmentIndex + 1];
      const dx = bx - ax;
      const dz = bz - az;
      const length = Math.hypot(dx, dz);
      const rotation = Math.atan2(dx, dz);
      const rightX = Math.cos(rotation);
      const rightZ = -Math.sin(rotation);
      const steps = Math.max(1, Math.floor(length / 16));
      for (let step = 0; step < steps; step += 1) {
        const t = (step + 0.5) / steps;
        const x = ax + dx * t;
        const z = az + dz * t;
        const side = (step + segmentIndex) % 2 ? -1 : 1;
        const edgeX = x + rightX * side * 4.35;
        const edgeZ = z + rightZ * side * 4.35;
        this.box(group, edgeX, 0.244, edgeZ, 0.22, 0.03, 0.92, spec.accentMaterial, rotation, `${spec.prefix}_Edge_Glow`);
        stats.routeMarks += 1;

        if (spec.kind === 'security') {
          this.cylinder(group, x - rightX * side * 4.4, 0.52, z - rightZ * side * 4.4, 0.1, 0.92, this.world.materials.cable, 8, `${spec.prefix}_Warning_Bollard`);
          this.box(group, x - rightX * side * 4.4, 1.0, z - rightZ * side * 4.4, 0.3, 0.12, 0.13, spec.accentMaterial, rotation, `${spec.prefix}_Warning_Light`);
          stats.warningBollards += 1;
          stats.lightStrips += 1;
        } else {
          this.box(group, x - rightX * side * 4.15, 0.38, z - rightZ * side * 4.15, 2.2, 0.28, 0.34, spec.hedgeMaterial, rotation, `${spec.prefix}_Hedge`);
          this.box(group, x + rightX * side * 5.4, 0.238, z + rightZ * side * 5.4, 1.8, 0.035, 0.38, spec.bedMaterial, rotation, `${spec.prefix}_Flower_Bed`);
          stats.hedges += 1;
          stats.flowerBeds += 1;
        }

        if (step % 2 === 0) {
          this.addLamp(group, x + rightX * side * 5.7, z + rightZ * side * 5.7, spec.color, 2.7, `${spec.prefix}_Lamp`);
          stats.lamps = (stats.lamps || 0) + 1;
        }
      }
    }
  }

  recordGate3Asset(placed) {
    if (placed) this.verticalSliceStats.authoredAssets += 1;
    return placed;
  }

  createStartDiorama() {
    const zone = findZone('landing');
    const group = new THREE.Group();
    group.name = 'SETPIECE_Start_Diorama';

    this.groundRect(group, zone.position[0] + 2, zone.position[2] - 4, 27, 18, this.world.materials.plazaRoad, 0.118, 'StartLaunchPad');
    this.box(group, zone.position[0] + 2, 0.18, zone.position[2] - 12.9, 24, 0.04, 0.36, this.world.materials.glowBlue, 0, 'StartPadFrontGlow');
    this.box(group, zone.position[0] - 11.4, 0.18, zone.position[2] - 4, 0.36, 0.04, 15, this.world.materials.glow, 0, 'StartPadLeftGlow');

    const pavers = [
      [-7.5, -9.5, 3.2, 1.5, -0.48],
      [-3.2, -11.2, 3.1, 1.5, -0.22],
      [1.3, -11.8, 3.0, 1.5, 0.04],
      [5.8, -10.8, 3.4, 1.5, 0.26],
      [9.1, -7.8, 3.5, 1.5, 0.6],
      [-10.8, 1.8, 2.7, 1.2, 1.1],
      [11.2, 4.5, 2.9, 1.2, -0.9]
    ];
    for (const [dx, dz, sx, sz, rot] of pavers) {
      this.box(group, zone.position[0] + dx, 0.13, zone.position[2] + dz, sx, 0.08, sz, this.world.materials.paleStone, rot, 'StartPaver');
    }
    this.startLaunchCueAssets(group, zone);
    this.createStartLaunchStaging(group, zone);
    this.createStartSightlineGuides(group, zone);

    this.addLamp(group, zone.position[0] - 11.4, zone.position[2] - 10.5, 0xffc36a, 3.1, 'StartLampLeft');
    this.addLamp(group, zone.position[0] + 14.2, zone.position[2] - 9.4, 0x7cffb2, 3.0, 'StartLampRight');
    this.addLamp(group, zone.position[0] - 8.5, zone.position[2] + 7.4, 0x68d8ff, 2.8, 'StartLampRear');

    this.addSign(group, 'START LINE', 'Portfolio Drive', zone.position[0] + 14.4, zone.position[2] + 5.8, -0.88, 0x7cffb2, 3.4, 'StartClickSign');
    this.addSign(group, 'FCCU', 'Education Grove', zone.position[0] - 20.5, zone.position[2] + 14.0, 0.74, 0x9ccfff, 2.6, 'StartFccSign');
    this.addSign(group, 'SECURITY', 'Scanner Route', zone.position[0] - 24.0, zone.position[2] - 12.0, 1.12, 0x68d8ff, 2.6, 'StartSecuritySign');

    this.addBench(group, zone.position[0] - 11.8, zone.position[2] + 4.5, 0.42, 0.92);
    this.addBench(group, zone.position[0] + 8.4, zone.position[2] + 11.2, -0.72, 0.88);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', zone.position[0] + 13.0, zone.position[2] - 2.2, -0.72, 0.82);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', zone.position[0] - 13.2, zone.position[2] - 8.6, 0.22, 0.92);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] - 5.2, zone.position[2] + 10.8, 0.18, 0.8);
    this.addPlanterCluster(group, zone.position[0] - 15.2, zone.position[2] - 0.4, 0x7cffb2);
    this.addPlanterCluster(group, zone.position[0] + 16.2, zone.position[2] + 0.8, 0x68d8ff);
    this.addPolishAsset(group, 'EnvPolishCircuitGate', zone.position[0] + 2, zone.position[2] - 14.2, -0.02, 0.64);
    this.checkerStripe(group, zone.position[0] + 2, zone.position[2] - 13.8, 24, 0);
    this.campusArch(group, zone.position[0] - 15.8, zone.position[2] - 12.8, -0.18);

    for (let i = 0; i < 7; i += 1) {
      const x = zone.position[0] - 7 + i * 4.2;
      const z = zone.position[2] - 18 - Math.sin(i * 0.8) * 1.4;
      this.arrowMarker(group, x, z, -0.1 + i * 0.04, i % 2 ? 0x68d8ff : 0x7cffb2, 'StartRouteArrow');
    }

    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_start' });
    this.world.scene.add(group);
  }

  startLaunchCueAssets(group, zone) {
    const centerX = zone.position[0] + 2;
    const centerZ = zone.position[2] - 10.2;
    if (this.addPolishAsset(group, 'EnvPolishChevronBollardRun', centerX - 5.7, centerZ - 1.8, Math.PI * 0.5, 0.92)) {
      this.startDioramaStats.authoredAssets += 1;
    }
    if (this.addPolishAsset(group, 'EnvPolishChevronBollardRun', centerX + 5.7, centerZ - 1.8, Math.PI * 0.5, 0.92)) {
      this.startDioramaStats.authoredAssets += 1;
    }
    this.arrowMarker(group, centerX, zone.position[2] - 11.2, 0, 0xffc36a, 'StartDriveGroundCue');
  }

  createStartLaunchStaging(group, zone) {
    const centerX = zone.position[0] + 2;
    const stagingZ = zone.position[2] - 13.6;
    const laneZ = zone.position[2] - 15.8;

    for (const side of [-1, 1]) {
      const sideX = centerX + side * 2.1;
      for (let index = 0; index < 4; index += 1) {
        this.box(
          group,
          sideX + side * Math.sin(index * 0.8) * 0.18,
          0.206 + index * 0.0004,
          laneZ + index * 1.55,
          0.42 + index * 0.05,
          0.026,
          2.35 + index * 0.32,
          this.world.materials.darkWood,
          side * (0.05 + index * 0.018),
          'StartBurnoutScuff'
        );
        this.startDioramaStats.burnoutScuffs += 1;
      }
    }

    for (let index = 0; index < 7; index += 1) {
      const offset = -5.1 + index * 1.7;
      const material = index % 3 === 0 ? this.world.materials.glowBlue : this.world.materials.glow;
      this.box(group, centerX + offset, 0.226 + index * 0.0003, stagingZ - 1.1, 1.05, 0.055, 0.36, material, 0.02, 'StartLaunchTile');
      this.startDioramaStats.launchTiles += 1;
    }

    for (const side of [-1, 1]) {
      const railX = centerX + side * 6.4;
      this.box(group, railX, 0.38, stagingZ - 1.5, 0.22, 0.38, 7.6, this.world.materials.darkWood, 0.04, 'StartLaneRail');
      this.box(group, railX - side * 0.34, 0.62, stagingZ - 1.5, 0.14, 0.14, 7.1, this.world.materials.paleStone, 0.04, 'StartLaneRailTop');
      this.startDioramaStats.laneRails += 2;

      if (this.addPolishAsset(group, 'EnvPolishRoadBarrier', centerX + side * 8.4, stagingZ - 4.6, side * 0.12, 0.68)) {
        this.startDioramaStats.authoredAssets += 1;
      }

      for (let index = 0; index < 4; index += 1) {
        const lightZ = stagingZ - 4.2 + index * 2.1;
        this.cylinder(group, centerX + side * 5.1, 0.72, lightZ, 0.055, 1.1, this.world.materials.darkWood, 8, 'StartWitnessPost');
        this.box(
          group,
          centerX + side * 5.1,
          1.34,
          lightZ,
          0.38,
          0.22,
          0.18,
          index % 2 === 0 ? this.world.materials.glowBlue : this.world.materials.glow,
          0,
          'StartWheelieWitnessLight'
        );
        this.startDioramaStats.wheelieWitnessLights += 1;
      }
    }
  }

  createStartSightlineGuides(group, zone) {
    const centerX = zone.position[0] + 2;
    const baseZ = zone.position[2] - 24.5;
    for (let index = 0; index < 6; index += 1) {
      const z = baseZ + index * 2.65;
      const width = 0.34 + index * 0.035;
      const depth = 1.2 + index * 0.18;
      const offset = 5.8 + index * 0.28;
      const material = index % 2 ? this.world.materials.glowBlue : this.world.materials.warmGlow;
      for (const side of [-1, 1]) {
        this.box(
          group,
          centerX + side * offset,
          0.218 + index * 0.0002,
          z,
          width,
          0.035,
          depth,
          material,
          side * 0.05,
          'StartSightlineGuideMark'
        );
        this.startDioramaStats.sightlineGuideMarks += 1;
      }
    }
  }

  createEducationPlaza() {
    const zone = findZone('education');
    const group = new THREE.Group();
    group.name = 'SETPIECE_FCC_Education_Grove';

    this.groundRect(group, zone.position[0], zone.position[2] - 8.6, 35, 18, this.world.materials.plazaRoad, 0.12, 'FCCFrontQuad');
    this.groundRect(group, zone.position[0], zone.position[2] + 12.2, 30, 11, this.world.materials.paleStone, 0.118, 'FCCRearWalk');
    this.groundRect(group, zone.position[0] - 16.4, zone.position[2] + 1.8, 6.8, 23, this.world.materials.paleStone, 0.121, 'FCCLeftStudyWalk');
    this.groundRect(group, zone.position[0] + 17.6, zone.position[2] - 1.2, 7.2, 21, this.world.materials.paleStone, 0.121, 'FCCRightGardenWalk');
    for (let i = 0; i < 8; i += 1) {
      this.box(group, zone.position[0] - 14 + i * 4, 0.19, zone.position[2] - 21.8, 2.35, 0.045, 0.42, i % 2 ? this.world.materials.glowBlue : this.world.materials.paleStone, 0.04, 'FCCArrivalPaver');
    }
    for (let i = 0; i < 7; i += 1) {
      this.box(group, zone.position[0] - 15.8, 0.19, zone.position[2] - 6.8 + i * 3.4, 0.42, 0.045, 1.7, i % 2 ? this.world.materials.paleStone : this.world.materials.glowBlue, -0.08, 'FCCLeftWalkGuide');
      this.box(group, zone.position[0] + 17.8, 0.19, zone.position[2] - 7.2 + i * 3.1, 0.42, 0.045, 1.55, i % 2 ? this.world.materials.warmGlow : this.world.materials.paleStone, 0.08, 'FCCRightWalkGuide');
    }
    this.addSign(group, 'FCCU S BLOCK', 'Forman Christian College', zone.position[0] - 18.5, zone.position[2] - 16.2, 0.2, 0x9ccfff, 3.7, 'FCCIdentitySign');

    for (const dx of [-18, -7, 7, 18]) {
      this.addLamp(group, zone.position[0] + dx, zone.position[2] - 19, 0x9ccfff, 3.2, 'FCCFrontLamp');
    }
    for (const [x, z, rot] of [
      [zone.position[0] - 23, zone.position[2] - 9, 0.84],
      [zone.position[0] - 14, zone.position[2] + 21, -0.62],
      [zone.position[0] + 14, zone.position[2] - 12, -0.38],
      [zone.position[0] + 25, zone.position[2] + 14, 0.48]
    ]) {
      this.addBench(group, x, z, rot, 0.96);
    }

    for (const [x, z] of [
      [zone.position[0] - 27, zone.position[2] - 14],
      [zone.position[0] - 22, zone.position[2] + 15],
      [zone.position[0] + 25, zone.position[2] - 12],
      [zone.position[0] + 22, zone.position[2] + 16],
      [zone.position[0] - 2, zone.position[2] + 27]
    ]) {
      this.addPlanterCluster(group, x, z, 0x9ccfff);
    }

    this.addPolishAsset(group, 'EnvPolishInfoKiosk', zone.position[0] + 20.4, zone.position[2] - 16.5, -0.34, 0.82);
    this.addPolishAsset(group, 'EnvPolishCampusWalkwayPavilion', zone.position[0] - 1.4, zone.position[2] - 22.8, 0.05, 0.9);
    this.addPolishAsset(group, 'EnvPolishCampusFountain', zone.position[0] + 16.8, zone.position[2] - 8.8, -0.12, 0.72);
    this.addPolishAsset(group, 'EnvPolishCampusNoticeBoard', zone.position[0] - 22.6, zone.position[2] - 8.8, 0.34, 0.76);
    this.addPolishAsset(group, 'EnvPolishCampusStudyBench', zone.position[0] - 19.4, zone.position[2] + 10.8, 0.52, 0.76);
    this.addPolishAsset(group, 'EnvPolishCampusStudyBench', zone.position[0] + 18.8, zone.position[2] + 10.4, -0.52, 0.74);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] - 20.8, zone.position[2] + 5.2, 0.64, 0.9);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', zone.position[0] + 20.2, zone.position[2] + 6.4, -0.62, 0.9);
    this.addPolishAsset(group, 'EnvPolishGardenArch', zone.position[0] + 17.6, zone.position[2] - 18.6, -0.12, 0.78);
    this.campusArch(group, zone.position[0] - 15.5, zone.position[2] - 18.8, 0.08);
    this.hedgeLine(group, zone.position[0] - 23, zone.position[2] - 20, 45, 0);
    this.hedgeLine(group, zone.position[0] + 23, zone.position[2] - 20, 45, 0);
    for (const dx of [-9, 0, 9]) {
      this.flagPole(group, zone.position[0] + dx, zone.position[2] - 23.5, 0x9ccfff);
    }
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_fcc' });
    this.world.scene.add(group);
  }

  createSecurityLab() {
    const zone = findZone('security');
    const scan = this.securityScanPose(zone);
    const group = new THREE.Group();
    group.name = 'SETPIECE_Security_Lab';

    this.groundRect(group, zone.position[0], zone.position[2], 32, 28, this.world.materials.securityRoad, 0.13, 'SecurityScannerPad');
    this.box(group, zone.position[0], 0.18, zone.position[2] - 14.2, 26, 0.04, 0.32, this.world.materials.glowBlue, 0, 'SecurityPadFrontTrace');
    this.box(group, zone.position[0] - 16.2, 0.18, zone.position[2], 0.32, 0.04, 24, this.world.materials.glowBlue, 0, 'SecurityPadLeftTrace');
    this.box(group, zone.position[0] + 16.2, 0.18, zone.position[2], 0.32, 0.04, 24, this.world.materials.glowPink, 0, 'SecurityPadRightTrace');
    this.securityLabStats.floorMarks += 3;
    this.securityPadTraceGrid(group, zone);

    this.securityGate(group, scan.x, scan.z, scan.rotation);
    this.securityScanWaveField(group, scan.x, scan.z, scan.rotation);
    this.addSecurityLabAsset(group, 'EnvPolishSecurityScanner', zone.position[0] + 4.8, zone.position[2] + 3.0, -0.28, 0.92);
    this.addSecurityLabAsset(group, 'EnvPolishTerminalPillar', zone.position[0] - 12.2, zone.position[2] + 9.5, 0.34, 1.05);
    this.addSecurityLabAsset(group, 'EnvPolishSignalTotem', zone.position[0] + 13.8, zone.position[2] + 8.2, -0.44, 1.05);
    this.addSign(group, 'SECURITY SCAN', 'Authorized Assessments', zone.position[0] + 12.8, zone.position[2] - 11.8, -0.55, 0x68d8ff, 3.0, 'SecurityScanSign');

    for (const [x, z, rot] of [
      [-140, -48, 0.4],
      [-136, -31, 1.2],
      [-114, -56, -0.18],
      [-108, -35, -0.72]
    ]) {
      this.serverRack(group, x, z, rot);
    }

    this.cable(group, [-139, 0.3, -49], [-132, 0.25, -44], [-124, 0.32, -45], 0x10191f);
    this.cable(group, [-111, 0.3, -56], [-122, 0.25, -50], [-130, 0.32, -55], 0x10191f);
    this.cable(group, [-136, 0.3, -31], [-128, 0.26, -36], [-119, 0.3, -34], 0x10191f);
    this.securityLabStats.cableRuns += 3;
    this.securityPadCableRun(group, zone.position[0] - 12.2, zone.position[2] - 4.8, scan.x, scan.z);
    this.securityPadCableRun(group, zone.position[0] + 10.8, zone.position[2] - 4.2, scan.x, scan.z);

    for (const [x, z, color] of [
      [-143, -25, 0x68d8ff],
      [-103, -42, 0xff6d8d],
      [-116, -64, 0x7cffb2],
      [-145, -58, 0x68d8ff]
    ]) {
      const beacon = this.beacon(group, x, z, color, { dynamicMaterial: true });
      this.securityScanObjects.push(beacon);
    }

    for (let i = 0; i < 8; i += 1) {
      const packetMaterial = this.world.materials.glowBlue.clone();
      packetMaterial.opacity = 0.42;
      const packet = new THREE.Mesh(new THREE.OctahedronGeometry(0.52, 0), packetMaterial);
      packet.name = 'SecurityPacketShard';
      packet.position.set(zone.position[0] - 12 + i * 3.4, 1.2 + (i % 3) * 0.2, zone.position[2] + 8 + Math.sin(i) * 2.2);
      group.add(packet);
      this.animated.push({
        kind: 'securityPacket',
        mesh: packet,
        baseX: packet.position.x,
        baseY: packet.position.y,
        baseZ: packet.position.z,
        baseOpacity: 0.42,
        scanX: scan.x,
        scanZ: scan.z,
        orbitRadius: 3.4 + (i % 3) * 0.48,
        orbitSpeed: 1.7 + i * 0.08,
        speed: 1.2,
        phase: i * 0.7,
        range: 0.34,
        rotationSpeed: 1.1 + i * 0.05
      });
      this.securityScanStats.packetShards += 1;
    }

    mergeStaticMeshesInGroup(group, {
      namePrefix: 'SETPIECE_security',
      shouldSkip: (object) => ['SecurityPacketShard', 'SetPieceBeaconGlow', 'SecurityScanWave'].includes(object.name)
    });
    this.world.scene.add(group);
  }

  securityPadTraceGrid(group, zone) {
    const centerX = zone.position[0];
    const centerZ = zone.position[2];
    for (let i = 0; i < 7; i += 1) {
      const offset = -10.8 + i * 3.6;
      this.box(group, centerX + offset, 0.184, centerZ - 4.4 + Math.sin(i) * 0.35, 0.24, 0.035, 6.2, i % 2 ? this.world.materials.glowBlue : this.world.materials.paleStone, 0.08, 'SecurityPadDataTrace');
      this.securityLabStats.floorMarks += 1;
    }
    for (let i = 0; i < 6; i += 1) {
      const offset = -8.6 + i * 3.4;
      this.box(group, centerX + offset, 0.186, centerZ + 5.8 + Math.cos(i) * 0.35, 2.2, 0.035, 0.18, i % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue, -0.12, 'SecurityPadPacketLane');
      this.securityLabStats.floorMarks += 1;
    }
    for (let i = 0; i < 4; i += 1) {
      const x = centerX - 7.2 + i * 4.8;
      this.box(group, x, 0.188, centerZ + 0.8, 1.08, 0.035, 1.08, this.world.materials.securityRoad, 0.78, 'SecurityPadHatchPanel');
      this.box(group, x, 0.191, centerZ + 0.8, 0.78, 0.035, 0.1, this.world.materials.glowBlue, 0.78, 'SecurityPadHatchStripe');
      this.securityLabStats.floorMarks += 2;
    }
    for (const side of [-1, 1]) {
      this.box(group, centerX + side * 10.2, 0.198, centerZ - 8.1, 0.42, 0.06, 5.8, this.world.materials.darkWood, 0.02, 'SecurityTerminalRail');
      this.box(group, centerX + side * 7.8, 0.201, centerZ - 8.1, 0.32, 0.05, 4.8, this.world.materials.glowBlue, 0.02, 'SecurityTerminalRailGlow');
      this.securityLabStats.terminalRails += 2;
    }
  }

  securityPadCableRun(group, startX, startZ, endX, endZ) {
    const midX = (startX + endX) * 0.5;
    const midZ = (startZ + endZ) * 0.5;
    this.cable(group, [startX, 0.31, startZ], [midX, 0.25, midZ + 1.4], [endX, 0.3, endZ], 0x10191f);
    this.securityLabStats.cableRuns += 1;
  }

  addSecurityLabAsset(group, assetName, x, z, rotation, scale) {
    const placed = this.addPolishAsset(group, assetName, x, z, rotation, scale);
    if (placed) this.securityLabStats.authoredAssets += 1;
    return placed;
  }

  createDistrictDressing() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_District_Dressing';
    const projects = findZone('projects');
    this.addCompositionPad(group, projects.position[0] + 1.6, projects.position[2] + 0.8, 29, 18, this.world.materials.warmStone, 0.121, 'ProjectsAssemblyDeck');
    this.addCompositionPad(group, projects.position[0] - 7.8, projects.position[2] - 3.4, 7.2, 14, this.world.materials.plazaRoad, 0.126, 'ProjectsProcessLane');
    for (let i = 0; i < 8; i += 1) {
      this.addCompositionPathMark(
        group,
        projects.position[0] - 12.4 + i * 3.1,
        projects.position[2] - 7.4 + i * 1.18,
        1.5,
        0.14,
        i % 2 ? this.world.materials.warmGlow : this.world.materials.glowBlue,
        0.42,
        'ProjectsProcessGuideMark'
      );
    }
    this.addSign(group, 'PROJECTS', 'Build Yard', projects.position[0] - 12, projects.position[2] + 13, -0.35, 0xffcc66, 2.7, 'ProjectsFoundrySign');
    this.addLamp(group, projects.position[0] + 10, projects.position[2] + 12, 0xff9b6d, 3.0, 'FoundryLampA');
    this.addLamp(group, projects.position[0] - 16, projects.position[2] - 7, 0xffcc66, 2.7, 'FoundryLampB');
    this.addCompositionLamp(group, projects.position[0] + 15.2, projects.position[2] - 6.8, 0xffcc66, 2.6, 'ProjectsWorkLampA');
    this.addCompositionLamp(group, projects.position[0] - 13.4, projects.position[2] + 7.4, 0x68d8ff, 2.5, 'ProjectsWorkLampB');
    this.addPolishAsset(group, 'EnvPolishProjectForge', projects.position[0] + 4.6, projects.position[2] + 1.8, -0.52, 1.04);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', projects.position[0] - 8.4, projects.position[2] - 8.8, 0.34, 0.78);
    this.addPolishAsset(group, 'EnvPolishRoadBarrier', projects.position[0] + 14.2, projects.position[2] + 1.2, -0.46, 0.82);
    this.addSilhouetteAnchor(group, 'EnvPolishWorkshopCanopy', projects.position[0] + 1.4, projects.position[2] - 6.2, -0.42, 0.92);
    this.addCompositionAsset(group, 'EnvPolishProjectGantry', projects.position[0] - 4.8, projects.position[2] + 1.8, -0.34, 0.98);
    this.addCompositionAsset(group, 'EnvPolishProjectDisplayRack', projects.position[0] + 10.4, projects.position[2] + 6.8, -0.7, 0.82);
    this.addCompositionAsset(group, 'EnvPolishProjectPartsCart', projects.position[0] - 12.4, projects.position[2] - 2.4, 0.28, 0.86);
    this.addCompositionAsset(group, 'EnvPolishProjectCableReel', projects.position[0] + 11.4, projects.position[2] - 6.6, -0.22, 0.88);
    this.addCompositionAsset(group, 'EnvPolishBuildWorkbench', projects.position[0] - 3.8, projects.position[2] + 8.2, -0.18, 0.78);
    for (const [x, z, rotation, scale] of [
      [projects.position[0] + 9.0, projects.position[2] - 4.6, 0.34, 0.82],
      [projects.position[0] - 4.2, projects.position[2] + 8.4, -0.18, 0.74],
      [projects.position[0] + 3.0, projects.position[2] + 11.2, 0.56, 0.68],
      [projects.position[0] + 14.0, projects.position[2] + 0.4, -0.38, 0.64]
    ]) {
      this.addDistrictStoryAsset(group, 'EnvPolishBuildCrateStack', x, z, rotation, scale, 'crateStacks');
    }
    this.addCompositionPlanter(group, projects.position[0] - 14.2, projects.position[2] + 9.0, 0xffcc66);
    this.addYardEdgeDetails(group, projects.position[0] + 1.6, projects.position[2] + 0.8, 29, 18);
    for (const [dx, dz, rotation, scale] of [
      [-9.2, 4.3, 0.24, 0.76],
      [1.8, -2.2, -0.12, 0.72],
      [8.4, 2.7, 0.38, 0.7]
    ]) {
      this.addCompositionDetailAsset(group, 'EnvPolishYardSurfaceMarks', projects.position[0] + dx, projects.position[2] + dz, rotation, scale, 'surfaceMarks');
    }
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', projects.position[0] - 12.4, projects.position[2] - 8.2, 0.36, 0.74, 'rails');
    this.createProjectsYardLife(group, projects);

    const cv = findZone('cv');
    this.addSign(group, 'CV VAULT', 'Documents', cv.position[0] - 12.4, cv.position[2] - 11.6, 0.25, 0xe6f3ff, 1.9, 'CvVaultSign');
    this.addLamp(group, cv.position[0] + 8, cv.position[2] + 9, 0xe6f3ff, 2.8, 'CvLamp');
    this.addPolishAsset(group, 'EnvPolishCvVault', cv.position[0] - 0.4, cv.position[2] + 1.2, Math.PI + 0.12, 1.05);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', cv.position[0] + 8.8, cv.position[2] - 3.6, -0.22, 0.88);
    this.addCompositionPad(group, cv.position[0], cv.position[2], 13, 9, this.world.materials.plazaRoad, 0.13, 'CvVaultDocumentPad');
    this.addCompositionPad(group, cv.position[0] - 2.8, cv.position[2] + 3.6, 19, 12, this.world.materials.paleStone, 0.118, 'CvArchiveCourt');
    this.addSilhouetteAnchor(group, 'EnvPolishDocumentArcade', cv.position[0] - 4.2, cv.position[2] + 6.4, Math.PI + 0.16, 0.92);
    this.addCompositionAsset(group, 'EnvPolishQueueMarquee', cv.position[0] + 7.2, cv.position[2] + 4.8, Math.PI - 0.28, 0.62);
    this.box(group, cv.position[0], 0.19, cv.position[2] - 4.8, 10.6, 0.04, 0.28, this.world.materials.glowBlue, 0, 'CvVaultFrontTrace');
    this.addYardEdgeDetails(group, cv.position[0], cv.position[2], 13, 9);
    this.addYardEdgeDetails(group, cv.position[0] - 2.8, cv.position[2] + 3.6, 19, 12);
    for (const [dx, dz, rotation, scale] of [
      [-3.9, 1.9, 0.22, 0.62],
      [3.6, -1.8, -0.12, 0.58]
    ]) {
      this.addCompositionDetailAsset(group, 'EnvPolishYardSurfaceMarks', cv.position[0] + dx, cv.position[2] + dz, rotation, scale, 'surfaceMarks');
    }
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', cv.position[0] - 4.4, cv.position[2] - 4.1, 0.08, 0.62, 'rails');
    this.createCvDocumentLife(group, cv);

    const contact = findZone('contact');
    this.createHarborComposition(group, contact);

    const data = findZone('data-pier');
    this.createDataPierComposition(group, data);

    const sentinel = findZone('sentinel');
    this.addSign(group, 'SENTINEL', 'Cyber Ridge', sentinel.position[0] - 12, sentinel.position[2] - 12, 0.22, 0xff6d8d, 2.7, 'SentinelRidgeSign');
    this.addPolishAsset(group, 'EnvPolishSkillsArray', sentinel.position[0] - 4.4, sentinel.position[2] + 2.8, -0.12, 0.78);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', sentinel.position[0] + 2.4, sentinel.position[2] + 11.8, -0.18, 1.05);
    this.addSilhouetteAnchor(group, 'EnvPolishSignalSpire', sentinel.position[0] + 8.8, sentinel.position[2] + 6.8, -0.18, 1.04);
    this.antennaCluster(group, sentinel.position[0] + 10, sentinel.position[2] - 4, 0xff6d8d);
    this.antennaCluster(group, sentinel.position[0] - 8, sentinel.position[2] + 8, 0x68d8ff);

    const skills = findZone('skills');
    this.addSign(group, 'STACK', 'Skills Terminal', skills.position[0] - 10.6, skills.position[2] + 7.4, -0.62, 0x92ffea, 1.85, 'SkillsTerminalSign');
    this.addPolishAsset(group, 'EnvPolishSkillsArray', skills.position[0] - 0.6, skills.position[2] - 1.4, -0.62, 1.02);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', skills.position[0] + 10.8, skills.position[2] + 5.6, -0.62, 0.9);
    this.addSilhouetteAnchor(group, 'EnvPolishSignalSpire', skills.position[0] - 10.2, skills.position[2] - 2.8, -0.62, 0.9);
    this.addCompositionPad(group, skills.position[0] - 0.8, skills.position[2] - 2.8, 21, 12, this.world.materials.securityRoad, 0.122, 'SkillsTerminalCourt');
    this.addSilhouetteAnchor(group, 'EnvPolishTerminalCanopy', skills.position[0] - 1.8, skills.position[2] - 4.4, -0.62, 0.86);
    this.addCompositionAsset(group, 'EnvPolishProcessCrane', skills.position[0] + 9.8, skills.position[2] - 5.2, -0.62, 0.58);
    for (const [x, z, rotation, scale] of [
      [skills.position[0] - 4.8, skills.position[2] - 7.6, -0.2, 0.74],
      [skills.position[0] + 5.2, skills.position[2] - 8.0, -0.12, 0.7]
    ]) {
      this.addDistrictStoryAsset(group, 'EnvPolishTerminalBank', x, z, rotation, scale, 'terminalBanks');
    }
    this.createSkillsTerminalComposition(group, skills);
    this.createSkillsTerminalLife(group, skills);

    const awards = findZone('awards');
    this.addSign(group, 'AWARDS', 'Archive Steps', awards.position[0] - 9, awards.position[2] + 8, -0.2, 0xffdf8a, 2.3, 'AwardsSign');
    this.addPolishAsset(group, 'EnvPolishAwardsMonument', awards.position[0] + 0.2, awards.position[2] + 1.4, -0.18, 1.05);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', awards.position[0] + 7.5, awards.position[2] + 6.2, -0.34, 0.78);
    this.addDistrictStoryAsset(group, 'EnvPolishArchiveStepCluster', awards.position[0] - 1.2, awards.position[2] - 3.1, 0.02, 0.9, 'archiveSteps');
    this.createAwardsArchiveComposition(group, awards);

    const todo = findZone('todo');
    this.addCompositionPad(group, todo.position[0] - 1.2, todo.position[2] + 1.4, 22, 15, this.world.materials.plazaRoad, 0.121, 'TodoBuildYardPad');
    this.addCompositionPad(group, todo.position[0] - 7.8, todo.position[2] + 1.2, 5.8, 12.4, this.world.materials.paleStone, 0.126, 'TodoQueueWalk');
    for (let i = 0; i < 7; i += 1) {
      this.addCompositionPathMark(
        group,
        todo.position[0] - 11.2 + i * 2.6,
        todo.position[2] - 6.0 + i * 1.2,
        1.45,
        0.12,
        i % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue,
        0.36,
        'TodoQueueGuideMark'
      );
    }
    this.addSign(group, 'TODO', 'Build Queue', todo.position[0] - 8, todo.position[2] - 7, 0.68, 0xb6a0ff, 2.2, 'TodoSign');
    this.addPolishAsset(group, 'EnvPolishTodoBoard', todo.position[0] + 0.6, todo.position[2] + 1.0, 0.34, 1.02);
    this.addPolishAsset(group, 'EnvPolishInfoKiosk', todo.position[0] + 6.8, todo.position[2] - 5.2, -0.24, 0.72);
    this.addSilhouetteAnchor(group, 'EnvPolishQueueMarquee', todo.position[0] - 3.8, todo.position[2] + 7.9, 0.34, 0.72);
    this.addCompositionAsset(group, 'EnvPolishProcessCrane', todo.position[0] + 7.8, todo.position[2] + 1.8, 0.34, 0.56);
    this.addDistrictStoryAsset(group, 'EnvPolishTodoCardStack', todo.position[0] - 1.4, todo.position[2] + 6.2, 0.1, 0.86, 'todoStacks');
    this.addCompositionLamp(group, todo.position[0] - 11.6, todo.position[2] + 7.0, 0xb6a0ff, 2.6, 'TodoLampA');
    this.addCompositionLamp(group, todo.position[0] + 9.8, todo.position[2] - 6.2, 0x68d8ff, 2.5, 'TodoLampB');
    this.addCompositionAsset(group, 'EnvPolishBenchPlanter', todo.position[0] - 9.8, todo.position[2] + 7.2, -0.28, 0.72);
    this.addCompositionAsset(group, 'EnvPolishRoadBarrier', todo.position[0] + 10.8, todo.position[2] + 4.8, 0.18, 0.64);
    this.addCompositionAsset(group, 'EnvPolishRouteLantern', todo.position[0] - 12.8, todo.position[2] - 2.8, 0.42, 0.66);
    this.addSilhouetteAnchor(group, 'EnvPolishGardenArch', todo.position[0] - 7.2, todo.position[2] - 8.8, 0.68, 0.82);
    this.addCompositionPlanter(group, todo.position[0] + 8.6, todo.position[2] + 7.6, 0xb6a0ff);
    this.addYardEdgeDetails(group, todo.position[0] - 1.2, todo.position[2] + 1.4, 22, 15);
    for (const [dx, dz, rotation, scale] of [
      [-6.8, -3.6, 0.2, 0.72],
      [1.6, -1.7, -0.08, 0.68],
      [5.6, 4.4, 0.34, 0.7]
    ]) {
      this.addCompositionDetailAsset(group, 'EnvPolishYardSurfaceMarks', todo.position[0] + dx, todo.position[2] + dz, rotation, scale, 'surfaceMarks');
    }
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', todo.position[0] - 5.4, todo.position[2] - 5.4, 0.38, 0.72, 'rails');
    this.createTodoBuildYardComposition(group, todo);
    this.createTodoBuildYardLife(group, todo);

    const career = findZone('career');
    this.addSign(group, 'CAREER', 'Signal Office', career.position[0] - 10, career.position[2] + 9, -0.35, 0xb6a0ff, 2.4, 'CareerSign');
    this.addPolishAsset(group, 'EnvPolishCareerOffice', career.position[0] + 1.2, career.position[2] + 0.8, -0.24, 1.08);
    this.addCompositionPad(group, career.position[0] + 7, career.position[2] - 6, 9, 5.5, this.world.materials.plazaRoad, 0.16, 'CareerOfficeDeck');
    this.addCompositionPad(group, career.position[0] + 4.2, career.position[2] + 2.2, 18, 10, this.world.materials.paleStone, 0.122, 'CareerSignalPlaza');
    this.flagPole(group, career.position[0] + 13, career.position[2] - 6, 0xb6a0ff);
    this.addPolishAsset(group, 'EnvPolishSignalTotem', career.position[0] + 1.4, career.position[2] - 10.8, -0.18, 0.88);
    this.addSilhouetteAnchor(group, 'EnvPolishSignalSpire', career.position[0] + 10.6, career.position[2] + 2.2, -0.34, 0.86);
    this.addCompositionAsset(group, 'EnvPolishTerminalBank', career.position[0] + 6.6, career.position[2] + 5.4, -0.38, 0.68);
    this.addCompositionAsset(group, 'EnvPolishBenchPlanter', career.position[0] - 3.6, career.position[2] + 5.4, 0.42, 0.74);
    for (let i = 0; i < 7; i += 1) {
      this.addCareerConnectorMark(
        group,
        career.position[0] - 2.8 + i * 2.65,
        career.position[2] - 1.2 + i * 0.82,
        1.35,
        0.14,
        i % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue,
        -0.34,
        'CareerSignalGuideMark'
      );
    }
    this.addYardEdgeDetails(group, career.position[0] + 7, career.position[2] - 6, 9, 5.5);
    this.addYardEdgeDetails(group, career.position[0] + 4.2, career.position[2] + 2.2, 18, 10);
    for (const [dx, dz, rotation, scale] of [
      [4.1, -6.2, 0.12, 0.58],
      [9.5, -5.0, -0.28, 0.56]
    ]) {
      this.addCompositionDetailAsset(group, 'EnvPolishYardSurfaceMarks', career.position[0] + dx, career.position[2] + dz, rotation, scale, 'surfaceMarks');
    }
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', career.position[0] + 7.4, career.position[2] - 8.6, -0.08, 0.6, 'rails');
    this.createCareerOfficeComposition(group, career);

    const circuit = findZone('circuit');
    this.createCircuitStartComposition(group, circuit);

    const behind = findZone('behind');
    this.addCompositionPad(group, behind.position[0] - 0.4, behind.position[2] - 1.2, 23, 15, this.world.materials.plazaRoad, 0.121, 'BehindWorkshopPad');
    this.addCompositionPad(group, behind.position[0] - 8.2, behind.position[2] + 3.6, 6.4, 12.5, this.world.materials.paleStone, 0.126, 'BehindProcessWalk');
    for (let i = 0; i < 8; i += 1) {
      this.addCompositionPathMark(
        group,
        behind.position[0] - 11.8 + i * 2.65,
        behind.position[2] + 7.4 - i * 1.25,
        1.3,
        0.12,
        i % 2 ? this.world.materials.glowBlue : this.world.materials.glow,
        -0.34,
        'BehindProcessGuideMark'
      );
    }
    this.addSign(group, 'BEHIND', 'Process Yard', behind.position[0] - 10, behind.position[2] + 8, -0.2, 0x8fd3ff, 2.3, 'BehindSign');
    this.addPolishAsset(group, 'EnvPolishBuildWorkbench', behind.position[0] + 0.6, behind.position[2] - 1.2, 0.08, 1.08);
    this.addPolishAsset(group, 'EnvPolishTerminalPillar', behind.position[0] + 8.4, behind.position[2] + 3.6, 0.3, 0.82);
    this.addSilhouetteAnchor(group, 'EnvPolishProcessCrane', behind.position[0] - 2.8, behind.position[2] - 6.6, -0.22, 0.82);
    this.addCompositionAsset(group, 'EnvPolishTerminalCanopy', behind.position[0] + 5.4, behind.position[2] + 5.8, -0.24, 0.64);
    for (const [dx, dz, rotation, scale] of [[-6, -5, 0.22, 0.86], [1, -7, -0.12, 0.72], [7, -3, 0.42, 0.76]]) {
      this.addDistrictStoryAsset(group, 'EnvPolishBuildCrateStack', behind.position[0] + dx, behind.position[2] + dz, rotation, scale, 'crateStacks');
    }
    this.addCompositionLamp(group, behind.position[0] - 11.2, behind.position[2] - 6.6, 0x8fd3ff, 2.6, 'BehindLampA');
    this.addCompositionLamp(group, behind.position[0] + 10.8, behind.position[2] + 7.2, 0x7cffb2, 2.5, 'BehindLampB');
    this.addCompositionAsset(group, 'EnvPolishBenchPlanter', behind.position[0] - 10.4, behind.position[2] + 1.8, 0.28, 0.7);
    this.addCompositionAsset(group, 'EnvPolishRoadBarrier', behind.position[0] + 11.2, behind.position[2] - 7.2, -0.18, 0.62);
    this.addCompositionAsset(group, 'EnvPolishRouteLantern', behind.position[0] - 12.4, behind.position[2] - 2.6, -0.34, 0.66);
    this.addSilhouetteAnchor(group, 'EnvPolishWorkshopCanopy', behind.position[0] - 2.6, behind.position[2] + 4.0, -0.22, 0.86);
    this.addCompositionPlanter(group, behind.position[0] + 8.8, behind.position[2] - 8.0, 0x8fd3ff);
    this.addYardEdgeDetails(group, behind.position[0] - 0.4, behind.position[2] - 1.2, 23, 15);
    for (const [dx, dz, rotation, scale] of [
      [-6.2, 3.4, -0.28, 0.72],
      [2.4, 1.6, 0.1, 0.7],
      [6.5, -5.1, 0.32, 0.72]
    ]) {
      this.addCompositionDetailAsset(group, 'EnvPolishYardSurfaceMarks', behind.position[0] + dx, behind.position[2] + dz, rotation, scale, 'surfaceMarks');
    }
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', behind.position[0] - 5.8, behind.position[2] + 5.8, -0.18, 0.76, 'rails');
    this.addCompositionDetailAsset(group, 'EnvPolishWorkshopProcessRail', behind.position[0] + 5.8, behind.position[2] - 6.2, 0.32, 0.72, 'rails');
    this.createBehindBuildLife(group, behind);

    const potato = findZone('potato');
    this.addSign(group, 'FARM', 'Potato Counter', potato.position[0] - 11, potato.position[2] + 9, 0.32, 0xc79b56, 2.3, 'PotatoFarmSign');
    this.addPolishAsset(group, 'EnvPolishFarmIrrigator', potato.position[0] + 4.4, potato.position[2] - 1.8, 0.18, 1.04);
    this.addPolishAsset(group, 'EnvPolishBenchPlanter', potato.position[0] - 8.6, potato.position[2] + 1.4, 0.22, 0.78);
    this.addSilhouetteAnchor(group, 'EnvPolishGardenArch', potato.position[0] - 5.4, potato.position[2] + 7.0, 0.28, 0.78);
    this.createFarmFieldComposition(group, potato);

    mergeStaticMeshesInGroup(group, {
      namePrefix: 'SETPIECE_district',
      cellSize: 128,
      shouldSkip: (object) =>
        object.name === 'CvDocumentStream' ||
        object.name.startsWith('BehindBuild') ||
        object.name.startsWith('ProjectsYard') ||
        object.name.startsWith('SkillsTerminal') ||
        object.name.startsWith('TodoYard')
    });
    this.registerDistrictDressingBatches(group);
    this.world.scene.add(group);
  }

  createDistrictHeroDressing() {
    const group = this.registerQualityGroup(new THREE.Group(), 'secondary');
    group.name = 'SETPIECE_District_Hero_Dressing';
    const cv = findZone('cv');
    this.addSilhouetteAnchor(group, 'EnvPolishCvArchiveSpine', cv.position[0] - 4.8, cv.position[2] + 5.6, Math.PI + 0.14, 0.94);
    this.addSilhouetteAnchor(group, 'EnvPolishRouteStoryMarker', cv.position[0] - 12.4, cv.position[2] - 8.5, 0.24, 0.78);
    this.addSilhouetteAnchor(group, 'EnvPolishPlazaEdgeKit', cv.position[0] - 6.8, cv.position[2] - 7.8, 0.24, 0.92);
    this.addSilhouetteAnchor(group, 'EnvPolishChevronBollardRun', cv.position[0] - 3.0, cv.position[2] - 6.0, 0.24, 0.74);
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_district_hero' });
    this.registerBroadSetPieceBatches('districtHero', group, 'SETPIECE_district_hero', 'districtDressingRadius');
    this.world.scene.add(group);
  }

  registerDistrictDressingBatches(group) {
    this.districtDressingEntries = [];
    const scale = new THREE.Vector3();
    group.updateMatrixWorld(true);
    group.traverse((object) => {
      if (!object.isMesh || !object.geometry || !object.name.startsWith('SETPIECE_district')) return;
      object.geometry.computeBoundingSphere();
      const sphere = object.geometry.boundingSphere;
      if (!sphere) return;
      const center = sphere.center.clone().applyMatrix4(object.matrixWorld);
      object.getWorldScale(scale);
      this.districtDressingEntries.push({
        object,
        x: center.x,
        z: center.z,
        radius: sphere.radius * Math.max(scale.x, scale.y, scale.z)
      });
    });
    this.updateDistrictDressingVisibility();
  }

  updateDistrictDressingVisibility(origin) {
    const radius = this.world.getQualityProfile().districtDressingRadius || 0;
    if (origin && Number.isFinite(origin.x) && Number.isFinite(origin.z)) {
      this.districtVisibilityOrigin = { x: origin.x, z: origin.z };
    }
    const activeOrigin = this.districtVisibilityOrigin;
    let visibleBatches = 0;

    for (const entry of this.districtDressingEntries) {
      let visible = true;
      if (activeOrigin && radius > 0) {
        const edgeDistance = Math.hypot(entry.x - activeOrigin.x, entry.z - activeOrigin.z) - entry.radius;
        const threshold = entry.object.visible ? radius + VISIBILITY_HYSTERESIS : radius;
        visible = edgeDistance <= threshold;
      }
      entry.object.visible = visible;
      if (visible) visibleBatches += 1;
    }

    const batches = this.districtDressingEntries.length;
    this.districtVisibilityStats = {
      batches,
      visibleBatches,
      hiddenBatches: batches - visibleBatches,
      radius
    };
  }

  registerBroadSetPieceBatches(key, group, namePrefix, radiusKey = 'broadSetPieceRadius') {
    const scale = new THREE.Vector3();
    group.updateMatrixWorld(true);
    group.traverse((object) => {
      if (!object.isMesh || !object.geometry || !object.name.startsWith(namePrefix)) return;
      object.geometry.computeBoundingSphere();
      const sphere = object.geometry.boundingSphere;
      if (!sphere) return;
      const center = sphere.center.clone().applyMatrix4(object.matrixWorld);
      object.getWorldScale(scale);
      this.broadSetPieceEntries.push({
        key,
        radiusKey,
        root: group,
        object,
        x: center.x,
        z: center.z,
        radius: sphere.radius * Math.max(scale.x, scale.y, scale.z)
      });
    });
    this.updateBroadSetPieceVisibility();
  }

  updateBroadSetPieceVisibility(origin) {
    const profile = this.world.getQualityProfile();
    const radius = profile.broadSetPieceRadius || 0;
    if (origin && Number.isFinite(origin.x) && Number.isFinite(origin.z)) {
      this.broadVisibilityOrigin = { x: origin.x, z: origin.z };
    }
    const activeOrigin = this.broadVisibilityOrigin;
    const groups = {};
    let visibleBatches = 0;

    for (const entry of this.broadSetPieceEntries) {
      const entryRadius = profile[entry.radiusKey] || radius;
      if (!groups[entry.key]) {
        groups[entry.key] = { batches: 0, visibleBatches: 0, hiddenBatches: 0, radius: entryRadius };
      }
      groups[entry.key].batches += 1;

      let visible = true;
      if (activeOrigin && entryRadius > 0) {
        const edgeDistance = Math.hypot(entry.x - activeOrigin.x, entry.z - activeOrigin.z) - entry.radius;
        const threshold = entry.object.visible ? entryRadius + VISIBILITY_HYSTERESIS : entryRadius;
        visible = edgeDistance <= threshold;
      }
      entry.object.visible = visible;
      const effectivelyVisible = visible && entry.root.visible !== false;
      if (effectivelyVisible) {
        visibleBatches += 1;
        groups[entry.key].visibleBatches += 1;
      }
    }

    for (const groupStats of Object.values(groups)) {
      groupStats.hiddenBatches = groupStats.batches - groupStats.visibleBatches;
    }

    const batches = this.broadSetPieceEntries.length;
    this.broadVisibilityStats = {
      batches,
      visibleBatches,
      hiddenBatches: batches - visibleBatches,
      radius,
      groups
    };
  }

  createApproachDressing() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Approach_Dressing';
    const clusters = [
      { title: 'FCCU', subtitle: 'Campus Route', x: -47, z: 51, rotation: -0.54, color: 0x9ccfff, side: -1, asset: 'EnvPolishBenchPlanter' },
      { title: 'S BLOCK', subtitle: 'Education Grove', x: -60, z: 74, rotation: -0.42, color: 0x9ccfff, side: 1, asset: 'EnvPolishInfoKiosk' },
      { title: 'SECURITY', subtitle: 'Scan Run', x: -28, z: 5, rotation: -0.95, color: 0x68d8ff, side: 1, asset: 'EnvPolishSignalTotem' },
      { title: 'FIREWALL', subtitle: 'Gate Ahead', x: -74, z: -22, rotation: -0.72, color: 0x68d8ff, side: -1, asset: 'EnvPolishRoadBarrier' },
      { title: 'CV', subtitle: 'Document Run', x: 20, z: -10, rotation: 2.7, color: 0xe6f3ff, side: -1, asset: 'EnvPolishTerminalPillar' },
      { title: 'PROJECTS', subtitle: 'Build Yard', x: 44, z: 37, rotation: 1.84, color: 0xffcc66, side: -1, asset: 'EnvPolishInfoKiosk' },
      { title: 'HARBOR', subtitle: 'Signal Pier', x: 94, z: 51, rotation: 1.02, color: 0x78b7ff, side: 1, asset: 'EnvPolishPalm' },
      { title: 'DATA', subtitle: 'Visitor Trail', x: -122, z: 47, rotation: -1.1, color: 0x79ffc5, side: -1, asset: 'EnvPolishInfoKiosk' },
      { title: 'RIDGE', subtitle: 'Sentinel Climb', x: -17, z: 64, rotation: 0.65, color: 0xff6d8d, side: 1, asset: 'EnvPolishSignalTotem' },
      { title: 'STACK', subtitle: 'Skills Trail', x: -82, z: -74, rotation: -2.2, color: 0x92ffea, side: -1, asset: 'EnvPolishTerminalPillar' },
      { title: 'FARM', subtitle: 'Potato Track', x: -28, z: -126, rotation: -1.82, color: 0xc79b56, side: 1, asset: 'EnvPolishBenchPlanter' }
    ];
    clusters.forEach((cluster, index) => this.addApproachCluster(group, cluster, index));
    mergeStaticMeshesInGroup(group, {
      namePrefix: 'SETPIECE_approach',
      shouldSkip: (object) => object.name.startsWith('ApproachBeaconGlow')
    });
    group.userData.approachStats = { ...this.approachStats };
    this.registerQualityGroup(group, 'secondary');
    this.registerBroadSetPieceBatches('approach', group, 'SETPIECE_approach');
    this.world.scene.add(group);
  }

  createDistrictGateways() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_District_Gateways';
    const gateways = [
      { x: 36, z: 33, rotation: 1.34, color: 0xffcc66, width: 11.5 },
      { x: -55, z: 61, rotation: -0.5, color: 0x9ccfff, width: 10.5 },
      { x: -82, z: -25, rotation: -2.17, color: 0x68d8ff, width: 10.8 },
      { x: 27, z: -27, rotation: 2.68, color: 0xe6f3ff, width: 10.5 },
      { x: 94, z: -95, rotation: 1.5, color: 0xff9b6d, width: 11.2 },
      { x: -42, z: -123, rotation: -1.82, color: 0xc79b56, width: 10.2 },
      { x: 24, z: 104, rotation: 0.9, color: 0xff6d8d, width: 10.2 },
      { x: 80, z: -5, rotation: 2.4, color: 0xb6a0ff, width: 10.2 },
      { x: 105, z: 61, rotation: 1.0, color: 0x78b7ff, width: 10.0 },
      { x: -126, z: 47, rotation: -1.05, color: 0x79ffc5, width: 9.4 },
      { x: 22, z: -59, rotation: -2.53, color: 0xa8a6ff, width: 10.2 },
      { x: -26, z: 70, rotation: 0.17, color: 0xffdf8a, width: 9.6 }
    ];

    gateways.forEach((spec, index) => this.addDistrictGateway(group, spec, index));
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_gateway' });
    group.userData.gatewayStats = { ...this.gatewayStats };
    this.registerQualityGroup(group, 'secondary');
    this.registerBroadSetPieceBatches('gateways', group, 'SETPIECE_gateway');
    this.world.scene.add(group);
  }

  addDistrictGateway(group, spec, index) {
    const forwardX = Math.sin(spec.rotation);
    const forwardZ = Math.cos(spec.rotation);
    const rightX = Math.cos(spec.rotation);
    const rightZ = -Math.sin(spec.rotation);
    if (this.addPolishAsset(group, 'EnvPolishDistrictGateway', spec.x, spec.z, spec.rotation, 0.86)) {
      this.gatewayStats.gateways += 1;
      this.gatewayStats.authoredAssets += 1;
    }
    for (const side of [-1, 1]) {
      const x = spec.x + rightX * side * (spec.width * 0.5);
      const z = spec.z + rightZ * side * (spec.width * 0.5);
      if (this.addPolishAsset(group, 'EnvPolishRouteLantern', x - forwardX * 2.2, z - forwardZ * 2.2, spec.rotation + side * 0.18, 0.72)) {
        this.gatewayStats.lanterns += 1;
        this.gatewayStats.authoredAssets += 1;
      }
    }
    const stripMaterial = new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: 0.46, depthWrite: false });
    for (let i = -2; i <= 2; i += 1) {
      const marker = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.035, 1.42), stripMaterial);
      marker.name = `GatewayGuideStrip_${index}`;
      marker.position.set(spec.x + forwardX * i * 1.35, 0.225, spec.z + forwardZ * i * 1.35);
      marker.rotation.y = spec.rotation;
      group.add(marker);
      this.gatewayStats.guideStrips += 1;
    }
  }

  addApproachCluster(group, spec, index) {
    const side = spec.side || 1;
    const forwardX = Math.sin(spec.rotation);
    const forwardZ = Math.cos(spec.rotation);
    const rightX = Math.cos(spec.rotation);
    const rightZ = -Math.sin(spec.rotation);
    const lateral = (spec.lateral || 5.6) * side;
    const baseX = spec.x + rightX * lateral;
    const baseZ = spec.z + rightZ * lateral;
    const faceRoad = spec.rotation + (side > 0 ? -0.42 : 0.42);

    this.addSign(group, spec.title, spec.subtitle, baseX + forwardX * 1.4, baseZ + forwardZ * 1.4, faceRoad, spec.color, 1.8, `ApproachSign_${index}`);
    this.approachStats.signs += 1;
    this.addLamp(group, baseX - forwardX * 2.4, baseZ - forwardZ * 2.4, spec.color, 2.45, `ApproachLamp_${index}`);
    this.approachStats.lamps += 1;
    if (this.addPolishAsset(group, spec.asset, baseX - forwardX * 0.6 - rightX * side * 1.2, baseZ - forwardZ * 0.6 - rightZ * side * 1.2, faceRoad, 0.64)) {
      this.approachStats.authoredAssets += 1;
    }
    if (this.addPolishAsset(group, 'EnvPolishRoadBarrier', spec.x + rightX * side * 3.6, spec.z + rightZ * side * 3.6, spec.rotation + Math.PI * 0.5, 0.52)) {
      this.approachStats.authoredAssets += 1;
    }
    for (let i = -1; i <= 1; i += 1) {
      const markX = spec.x + forwardX * i * 3.2 + rightX * side * 2.6;
      const markZ = spec.z + forwardZ * i * 3.2 + rightZ * side * 2.6;
      this.box(group, markX, 0.205, markZ, 0.26, 0.035, 1.9, this.world.materials.paleStone, spec.rotation, 'ApproachRoadTick');
      this.approachStats.roadMarks += 1;
    }
    this.approachStats.clusters += 1;
  }

  createRouteGuidance() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Route_Guidance';
    const guides = [
      [-28, 36, 0.24, 0x9ccfff],
      [-54, 58, 0.42, 0x9ccfff],
      [-64, 86, 0.68, 0x9ccfff],
      [-28, 6, -0.76, 0x68d8ff],
      [-72, -20, -0.56, 0x68d8ff],
      [-104, -54, -0.3, 0x68d8ff],
      [22, -20, 0.2, 0xe6f3ff],
      [76, -92, 1.2, 0xff9b6d],
      [84, 50, 0.95, 0x78b7ff],
      [-132, 54, 0.8, 0x79ffc5]
    ];
    for (const [x, z, rot, color] of guides) {
      this.arrowMarker(group, x, z, rot, color, 'RouteArrow');
    }
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_route' });
    this.world.scene.add(group);
  }

  createRouteComposition() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Route_Composition';

    const splitterIslands = [
      [-13, 31, 0.18, 0.74],
      [-37, 40, -0.5, 0.72],
      [39, 29, 1.34, 0.74],
      [-65, -13, -0.96, 0.72],
      [23, -21, 2.68, 0.7],
      [86, -92, 1.5, 0.76],
      [102, 58, 1.0, 0.7],
      [-121, 49, -1.05, 0.66]
    ];
    for (const [x, z, rotation, scale] of splitterIslands) {
      this.addRouteCompositionAsset(group, 'EnvPolishRouteSplitterIsland', x, z, rotation, scale, 'splitterIslands');
    }

    const edgeKits = [
      [-18, 43, 0.1, 0.78],
      [17, 41, 0.14, 0.76],
      [-51, 56, -0.5, 0.72],
      [-68, 72, -0.42, 0.72],
      [-87, -31, -0.72, 0.72],
      [-111, -54, -0.3, 0.72],
      [50, 43, 1.84, 0.72],
      [78, -84, 2.46, 0.76],
      [-36, -122, -1.82, 0.74],
      [92, -10, 2.4, 0.72],
      [109, 62, 1.0, 0.68],
      [-130, 55, -1.05, 0.66]
    ];
    for (const [x, z, rotation, scale] of edgeKits) {
      this.addRouteCompositionAsset(group, 'EnvPolishPlazaEdgeKit', x, z, rotation, scale, 'plazaEdgeKits');
    }

    const bollardRuns = [
      [-29, 31, 0.24, 0.66],
      [-46, 51, -0.5, 0.64],
      [-58, 83, -0.42, 0.64],
      [-31, 4, -0.95, 0.64],
      [-74, -22, -0.72, 0.64],
      [18, -12, 2.7, 0.64],
      [62, -78, 2.46, 0.66],
      [46, 38, 1.84, 0.64],
      [93, 50, 1.02, 0.64],
      [-83, -76, -2.2, 0.64],
      [-28, -124, -1.82, 0.64],
      [25, 64, 0.65, 0.64]
    ];
    for (const [x, z, rotation, scale] of bollardRuns) {
      this.addRouteCompositionAsset(group, 'EnvPolishChevronBollardRun', x, z, rotation, scale, 'bollardRuns');
    }

    const routeStoryMarkers = [
      [-8, 37, 0.18, 0.78, 1, 6.2],
      [-48, 53, -0.5, 0.76, -1, 6.1],
      [-83, -28, -0.72, 0.76, 1, 6.4],
      [29, -26, 2.68, 0.74, -1, 6.2],
      [73, -86, 2.46, 0.78, 1, 6.0],
      [51, 45, 1.84, 0.76, -1, 6.2],
      [98, 57, 1.02, 0.74, 1, 5.8],
      [-124, 52, -1.05, 0.72, -1, 5.8],
      [-88, -80, -2.2, 0.74, 1, 6.0],
      [25, 70, 0.65, 0.74, -1, 6.1]
    ];
    for (const [x, z, rotation, scale, side, lateral] of routeStoryMarkers) {
      const rightX = Math.cos(rotation);
      const rightZ = -Math.sin(rotation);
      this.addRouteCompositionAsset(
        group,
        'EnvPolishRouteStoryMarker',
        x + rightX * side * lateral,
        z + rightZ * side * lateral,
        rotation - side * 0.28,
        scale,
        'routeStoryMarkers'
      );
    }

    const vistaKits = [
      [-22, 44, 0.12, 0.76, -1, 4.8],
      [-59, 67, -0.48, 0.72, 1, 5.2],
      [-78, -25, -0.7, 0.72, -1, 5.0],
      [58, 43, 1.86, 0.72, 1, 5.0],
      [90, -92, 1.48, 0.74, -1, 5.1],
      [-118, 54, -1.04, 0.68, 1, 4.6]
    ];
    for (const [x, z, rotation, scale, side, lateral] of vistaKits) {
      const rightX = Math.cos(rotation);
      const rightZ = -Math.sin(rotation);
      this.addRouteCompositionAsset(
        group,
        'EnvPolishRouteVistaKit',
        x + rightX * side * lateral,
        z + rightZ * side * lateral,
        rotation - side * 0.18,
        scale,
        'vistaKits'
      );
    }

    const eastVistaAnchors = [
      ['EnvPolishSignalSpire', 114, 18, -0.36, 0.58],
      ['EnvPolishGardenArch', 102, 30, 0.42, 0.66],
      ['EnvPolishRouteVistaKit', 124, 18, -0.28, 0.7],
      ['EnvPolishRouteStoryMarker', 132, 38, 0.82, 0.66],
      ['EnvPolishPlazaEdgeKit', 96, 16, -0.28, 0.66],
      ['EnvPolishChevronBollardRun', 116, 7, -0.36, 0.64]
    ];
    for (const [assetName, x, z, rotation, scale] of eastVistaAnchors) {
      this.addRouteCompositionAsset(group, assetName, x, z, rotation, scale, 'eastVistaAnchors');
    }

    const guideRuns = [
      { x: -12, z: 30, rotation: 0.18, color: this.world.materials.glow, count: 5 },
      { x: -40, z: 42, rotation: -0.5, color: this.world.materials.glowBlue, count: 5 },
      { x: 39, z: 31, rotation: 1.34, color: this.world.materials.warmGlow, count: 5 },
      { x: -66, z: -13, rotation: -0.96, color: this.world.materials.glowBlue, count: 5 },
      { x: 23, z: -22, rotation: 2.68, color: this.world.materials.paleStone, count: 5 },
      { x: 84, z: -92, rotation: 1.5, color: this.world.materials.warmGlow, count: 5 },
      { x: 101, z: 58, rotation: 1.0, color: this.world.materials.glowBlue, count: 5 },
      { x: -120, z: 48, rotation: -1.05, color: this.world.materials.glow, count: 5 },
      { x: 116, z: 24, rotation: -0.32, color: this.world.materials.glowBlue, count: 7 }
    ];
    for (const run of guideRuns) this.addRouteGuideTiles(group, run);
    this.addCoastalLoopStaging(group);

    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_route_composition', cellSize: 84 });
    group.userData.routeCompositionStats = { ...this.routeCompositionStats };
    this.registerQualityGroup(group, 'secondary');
    this.registerBroadSetPieceBatches('routeComposition', group, 'SETPIECE_route_composition', 'routeCompositionRadius');
    this.world.scene.add(group);
  }

  addCoastalLoopStaging(group) {
    const splitterIslands = [
      [-64, 128, 1.42, 0.7],
      [112, 96, 2.2, 0.72],
      [106, -118, -1.4, 0.74],
      [-134, -16, -0.36, 0.68]
    ];
    for (const [x, z, rotation, scale] of splitterIslands) {
      this.addCoastalLoopAsset(group, 'EnvPolishRouteSplitterIsland', x, z, rotation, scale, 'splitterIslands');
    }

    const edgeKits = [
      [-102, 76, 0.24, 0.68],
      [-42, 134, 1.5, 0.7],
      [90, 118, 2.08, 0.68],
      [139, 38, 3.05, 0.66],
      [124, -74, -2.84, 0.7],
      [62, -125, -1.46, 0.72],
      [-86, -96, -2.24, 0.7],
      [-140, -4, -0.36, 0.66]
    ];
    for (const [x, z, rotation, scale] of edgeKits) {
      this.addCoastalLoopAsset(group, 'EnvPolishPlazaEdgeKit', x, z, rotation, scale, 'plazaEdgeKits');
    }

    const bollardRuns = [
      [-92, 104, 0.72, 0.64],
      [8, 136, 1.54, 0.66],
      [130, 70, 2.42, 0.64],
      [128, -32, -2.9, 0.64],
      [34, -123, -1.46, 0.66],
      [-116, -54, -2.42, 0.64]
    ];
    for (const [x, z, rotation, scale] of bollardRuns) {
      this.addCoastalLoopAsset(group, 'EnvPolishChevronBollardRun', x, z, rotation, scale, 'bollardRuns');
    }

    const storyMarkers = [
      [-74, 122, 0.78, 0.68],
      [48, 134, 1.76, 0.68],
      [136, 54, 2.9, 0.66],
      [104, -120, -1.3, 0.68],
      [-36, -122, -1.9, 0.66],
      [-140, -30, -0.42, 0.66]
    ];
    for (const [x, z, rotation, scale] of storyMarkers) {
      this.addCoastalLoopAsset(group, 'EnvPolishRouteStoryMarker', x, z, rotation, scale, 'routeStoryMarkers');
    }

    const vistaKits = [
      [-108, 96, 0.58, 0.68],
      [18, 142, 1.5, 0.72],
      [142, 18, 3.12, 0.68],
      [74, -130, -1.46, 0.7],
      [-126, -62, -2.38, 0.68]
    ];
    for (const [x, z, rotation, scale] of vistaKits) {
      this.addCoastalLoopAsset(group, 'EnvPolishRouteVistaKit', x, z, rotation, scale, 'vistaKits');
    }

    const guideRuns = [
      { x: -104, z: 94, rotation: 0.3, color: this.world.materials.glowBlue, count: 5 },
      { x: 18, z: 138, rotation: 1.5, color: this.world.materials.warmGlow, count: 5 },
      { x: 141, z: 50, rotation: 3.1, color: this.world.materials.glowBlue, count: 5 },
      { x: 70, z: -124, rotation: 1.45, color: this.world.materials.warmGlow, count: 5 },
      { x: -134, z: -28, rotation: -0.44, color: this.world.materials.glow, count: 5 }
    ];
    for (const run of guideRuns) {
      this.addRouteGuideTiles(group, run);
      this.routeCompositionStats.coastalLoopStaging += run.count || 5;
    }
  }

  createMeadowComposition() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Meadow_Composition';
    const pockets = [
      {
        x: 38,
        z: -4,
        rotation: -0.34,
        width: 28,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 811,
        assets: [
          ['EnvPolishRouteVistaKit', -8.2, 2.4, -0.18, 0.7],
          ['EnvPolishGardenArch', 8.8, -1.8, 0.28, 0.72],
          ['EnvPolishBenchPlanter', -4.4, -6.4, 0.18, 0.66],
          ['EnvPolishRouteStoryMarker', 6.8, 6.0, -0.24, 0.64]
        ]
      },
      {
        x: -18,
        z: -24,
        rotation: 0.18,
        width: 27,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glow,
        paver: this.world.materials.warmStone,
        seed: 827,
        assets: [
          ['EnvPolishRouteVistaKit', -8.4, -1.6, 0.18, 0.68],
          ['EnvPolishPlazaEdgeKit', 7.2, -5.8, -0.12, 0.72],
          ['EnvPolishBenchPlanter', -2.8, 6.2, -0.2, 0.66],
          ['EnvPolishRouteLantern', 8.8, 4.2, 0.24, 0.66]
        ]
      },
      {
        x: 78,
        z: -108,
        rotation: -0.28,
        width: 32,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.stuntRamp,
        seed: 839,
        assets: [
          ['EnvPolishChevronBollardRun', -10.2, 1.2, -0.14, 0.7],
          ['EnvPolishRouteVistaKit', 8.6, 4.0, 0.22, 0.72],
          ['EnvPolishBenchPlanter', -4.8, -6.4, 0.2, 0.68],
          ['EnvPolishRouteStoryMarker', 10.4, -4.6, -0.26, 0.66]
        ]
      },
      {
        x: -18,
        z: -118,
        rotation: 0.22,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.wood,
        seed: 853,
        assets: [
          ['EnvPolishGardenArch', -8.0, 3.8, 0.2, 0.7],
          ['EnvPolishBenchPlanter', 7.0, 5.4, -0.18, 0.66],
          ['EnvPolishRouteVistaKit', 3.8, -6.0, 0.18, 0.68],
          ['EnvPolishRouteLantern', -10.2, -5.0, -0.24, 0.64]
        ]
      },
      {
        x: 88,
        z: -8,
        rotation: -0.42,
        width: 29,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowPink,
        paver: this.world.materials.paleStone,
        seed: 867,
        assets: [
          ['EnvPolishRouteStoryMarker', -8.6, 4.8, 0.2, 0.66],
          ['EnvPolishPlazaEdgeKit', 8.0, -4.2, -0.14, 0.72],
          ['EnvPolishBenchPlanter', -2.4, -6.6, 0.18, 0.66],
          ['EnvPolishRouteVistaKit', 7.4, 5.8, -0.22, 0.68]
        ]
      },
      {
        x: -8,
        z: -72,
        rotation: 0.18,
        width: 30,
        depth: 18,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 881,
        assets: [
          ['EnvPolishDocumentArcade', -9.4, 2.8, 0.16, 0.66],
          ['EnvPolishBenchPlanter', 8.4, -3.2, -0.18, 0.66],
          ['EnvPolishRouteVistaKit', -4.8, -7.0, 0.2, 0.68],
          ['EnvPolishRouteLantern', 10.4, 6.2, -0.24, 0.64]
        ]
      },
      {
        x: 78,
        z: 20,
        rotation: -0.26,
        width: 34,
        depth: 20,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glow,
        paver: this.world.materials.warmStone,
        seed: 887,
        assets: [
          ['EnvPolishSignalSpire', -9.4, 3.4, 0.12, 0.58],
          ['EnvPolishPlazaEdgeKit', 8.6, -4.6, -0.14, 0.68],
          ['EnvPolishBenchPlanter', -2.8, -6.8, 0.18, 0.66],
          ['EnvPolishRouteStoryMarker', 10.2, 6.2, -0.22, 0.64]
        ]
      },
      {
        x: -34,
        z: -94,
        rotation: 0.34,
        width: 30,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.wood,
        seed: 893,
        assets: [
          ['EnvPolishBuildWorkbench', -8.6, 2.8, 0.18, 0.58],
          ['EnvPolishGardenArch', 8.2, -2.8, -0.14, 0.66],
          ['EnvPolishBenchPlanter', -2.4, -6.2, 0.22, 0.64],
          ['EnvPolishRouteVistaKit', 9.4, 5.4, -0.18, 0.66]
        ]
      }
    ];

    pockets.forEach((pocket, index) => this.addMeadowPocket(group, pocket, index));
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_meadow_composition', cellSize: 42 });
    group.userData.meadowCompositionStats = { ...this.meadowCompositionStats };
    this.registerQualityGroup(group, 'secondary');
    this.registerBroadSetPieceBatches('meadowComposition', group, 'SETPIECE_meadow_composition', 'meadowCompositionRadius');
    this.world.scene.add(group);
  }

  addMeadowPocket(group, pocket, index) {
    this.groundPatch(group, pocket.x, pocket.z, pocket.width, pocket.depth, pocket.material, 0.121, pocket.rotation, 'MeadowPocketLawn', pocket.seed);
    this.groundPatch(
      group,
      pocket.x + Math.sin(pocket.rotation) * 3.2,
      pocket.z + Math.cos(pocket.rotation) * 3.2,
      pocket.width * 0.55,
      pocket.depth * 0.38,
      this.world.materials.grassSandBlend,
      0.124,
      pocket.rotation + 0.12,
      'MeadowPocketFeather',
      pocket.seed + 7
    );
    this.meadowCompositionStats.patches += 2;
    this.addMeadowStoneRun(group, pocket);
    this.addMeadowGuideTiles(group, pocket);
    for (const asset of pocket.assets) {
      this.addMeadowAsset(group, pocket, ...asset);
    }
    for (const [right, forward, color] of [
      [-pocket.width * 0.38, -pocket.depth * 0.34, pocket.accent.color?.getHex?.() || 0x7cffb2],
      [pocket.width * 0.38, pocket.depth * 0.34, 0xffc36a]
    ]) {
      const [x, z] = this.meadowPoint(pocket, right, forward);
      this.addMeadowLamp(group, x, z, color, 2.35, `MeadowPocketLamp_${index}`);
    }
    this.meadowCompositionStats.pockets += 1;
  }

  addMeadowStoneRun(group, pocket) {
    for (let i = 0; i < 4; i += 1) {
      const [x, z] = this.meadowPoint(pocket, -6.3 + i * 4.2, -pocket.depth * 0.21 + Math.sin(i * 0.9) * 0.55);
      this.box(group, x, 0.208, z, 2.25, 0.035, 0.34, pocket.paver, pocket.rotation + (i % 2 ? 0.08 : -0.08), 'MeadowPocketStoneRun');
      this.meadowCompositionStats.stoneRuns += 1;
    }
  }

  addMeadowGuideTiles(group, pocket) {
    for (let i = 0; i < 5; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const [x, z] = this.meadowPoint(pocket, side * (pocket.width * 0.24), -5.0 + i * 2.45);
      this.box(group, x, 0.216, z, 0.28, 0.035, 1.18, pocket.accent, pocket.rotation + side * 0.05, 'MeadowPocketGuideTile');
      this.meadowCompositionStats.guideTiles += 1;
    }
  }

  addMeadowAsset(group, pocket, assetName, right, forward, rotationOffset, scale) {
    const [x, z] = this.meadowPoint(pocket, right, forward);
    const placed = this.addPolishAsset(group, assetName, x, z, pocket.rotation + rotationOffset, scale);
    if (placed) this.meadowCompositionStats.authoredAssets += 1;
    return placed;
  }

  addMeadowLamp(group, x, z, color, height, name) {
    this.addLamp(group, x, z, color, height, name);
    this.meadowCompositionStats.lamps += 1;
  }

  meadowPoint(pocket, right, forward) {
    return [
      pocket.x + Math.cos(pocket.rotation) * right + Math.sin(pocket.rotation) * forward,
      pocket.z - Math.sin(pocket.rotation) * right + Math.cos(pocket.rotation) * forward
    ];
  }

  createFieldBackdrops() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Field_Backdrops';
    const clusters = [
      {
        x: 28,
        z: 82,
        rotation: 0.2,
        width: 34,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.paleStone,
        seed: 911,
        assets: [
          ['EnvPolishGardenArch', -10.4, 2.8, 0.18, 0.7],
          ['EnvPolishRouteVistaKit', 8.8, -2.2, -0.16, 0.7],
          ['EnvPolishBenchPlanter', -3.8, -6.4, 0.14, 0.66],
          ['EnvPolishRouteLantern', 10.6, 5.6, -0.18, 0.64]
        ]
      },
      {
        x: 110,
        z: 80,
        rotation: -0.28,
        width: 31,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.warmStone,
        seed: 929,
        assets: [
          ['EnvPolishRouteStoryMarker', -9.2, 4.6, 0.16, 0.66],
          ['EnvPolishPlazaEdgeKit', 8.8, -3.8, -0.12, 0.68],
          ['EnvPolishBenchPlanter', -2.4, -6.2, 0.22, 0.64],
          ['EnvPolishRouteVistaKit', 8.4, 5.4, -0.18, 0.68]
        ]
      },
      {
        x: -128,
        z: 104,
        rotation: 0.34,
        width: 28,
        depth: 16,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 947,
        assets: [
          ['EnvPolishRouteVistaKit', -7.8, 4.4, 0.12, 0.66],
          ['EnvPolishGardenArch', 7.8, -2.8, -0.16, 0.68],
          ['EnvPolishBenchPlanter', -1.8, -6.0, 0.2, 0.64],
          ['EnvPolishRouteStoryMarker', 9.2, 4.8, -0.18, 0.64]
        ]
      },
      {
        x: -136,
        z: -18,
        rotation: -0.7,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.securityRoad,
        seed: 967,
        assets: [
          ['EnvPolishChevronBollardRun', -9.2, 2.4, -0.14, 0.66],
          ['EnvPolishRouteVistaKit', 8.4, 4.6, 0.18, 0.66],
          ['EnvPolishRouteStoryMarker', -5.4, -6.0, 0.22, 0.64],
          ['EnvPolishRouteLantern', 9.6, -5.2, -0.2, 0.64]
        ]
      },
      {
        x: 36,
        z: -132,
        rotation: -0.46,
        width: 36,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.stuntRamp,
        seed: 983,
        assets: [
          ['EnvPolishRouteVistaKit', -10.4, 3.2, 0.16, 0.7],
          ['EnvPolishChevronBollardRun', 10.2, -1.8, -0.18, 0.7],
          ['EnvPolishBenchPlanter', -3.8, -6.2, 0.18, 0.64],
          ['EnvPolishRouteStoryMarker', 9.6, 6.0, -0.2, 0.66]
        ]
      },
      {
        x: -118,
        z: -112,
        rotation: 0.28,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glow,
        paver: this.world.materials.wood,
        seed: 997,
        assets: [
          ['EnvPolishGardenArch', -8.6, 2.8, 0.18, 0.68],
          ['EnvPolishRouteVistaKit', 7.8, -3.2, -0.16, 0.66],
          ['EnvPolishBenchPlanter', -2.2, -6.0, 0.2, 0.64],
          ['EnvPolishRouteLantern', 9.2, 5.4, -0.18, 0.62]
        ]
      },
      {
        x: 94,
        z: -44,
        rotation: 0.52,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowPink,
        paver: this.world.materials.paleStone,
        seed: 1013,
        assets: [
          ['EnvPolishRouteStoryMarker', -9.2, 4.4, 0.16, 0.66],
          ['EnvPolishRouteVistaKit', 8.4, -3.4, -0.18, 0.68],
          ['EnvPolishPlazaEdgeKit', -2.8, -6.2, 0.14, 0.68],
          ['EnvPolishBenchPlanter', 9.0, 5.8, -0.2, 0.64]
        ]
      },
      {
        x: 132,
        z: 114,
        rotation: 0.14,
        width: 29,
        depth: 16,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.sand,
        seed: 1031,
        assets: [
          ['EnvPolishRouteVistaKit', -8.4, 3.8, 0.14, 0.66],
          ['EnvPolishBenchPlanter', 7.6, -3.6, -0.16, 0.64],
          ['EnvPolishRouteLantern', -2.6, -6.0, 0.16, 0.62],
          ['EnvPolishRouteStoryMarker', 8.8, 5.4, -0.22, 0.64]
        ]
      },
      {
        x: -10,
        z: -46,
        rotation: -0.16,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 1049,
        assets: [
          ['EnvPolishDocumentArcade', -8.6, 3.8, 0.12, 0.58],
          ['EnvPolishRouteVistaKit', 8.4, -3.4, -0.18, 0.66],
          ['EnvPolishBenchPlanter', -2.4, -6.0, 0.2, 0.62],
          ['EnvPolishRouteLantern', 9.2, 5.2, -0.18, 0.62]
        ]
      },
      {
        x: 72,
        z: 24,
        rotation: 0.24,
        width: 32,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glow,
        paver: this.world.materials.warmStone,
        seed: 1061,
        assets: [
          ['EnvPolishSignalSpire', -8.6, 3.8, 0.12, 0.52],
          ['EnvPolishRouteStoryMarker', 8.6, -3.8, -0.16, 0.64],
          ['EnvPolishPlazaEdgeKit', -2.6, -6.2, 0.16, 0.66],
          ['EnvPolishBenchPlanter', 9.0, 5.6, -0.2, 0.62]
        ]
      },
      {
        x: -18,
        z: -112,
        rotation: 0.38,
        width: 30,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.wood,
        seed: 1073,
        assets: [
          ['EnvPolishBuildWorkbench', -8.4, 3.4, 0.16, 0.56],
          ['EnvPolishRouteVistaKit', 8.4, -3.2, -0.16, 0.64],
          ['EnvPolishBenchPlanter', -2.4, -6.0, 0.2, 0.62],
          ['EnvPolishRouteLantern', 9.2, 5.4, -0.18, 0.62]
        ]
      },
      {
        x: 112,
        z: 1,
        rotation: -0.24,
        width: 42,
        depth: 22,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.sand,
        seed: 1087,
        assets: [
          ['EnvPolishShorelineBreakwater', -11.2, 4.8, 0.12, 0.72],
          ['EnvPolishRouteVistaKit', 10.8, -4.2, -0.18, 0.68],
          ['EnvPolishShorelineTidePool', -2.8, -7.2, 0.18, 0.74],
          ['EnvPolishRouteStoryMarker', 11.8, 6.6, -0.2, 0.64]
        ]
      }
    ];

    clusters.forEach((cluster, index) => this.addFieldBackdropCluster(group, cluster, index));
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_field_backdrops', cellSize: 84 });
    group.userData.fieldBackdropStats = { ...this.fieldBackdropStats };
    this.registerQualityGroup(group, 'secondary');
    this.registerBroadSetPieceBatches('fieldBackdrops', group, 'SETPIECE_field_backdrops', 'meadowCompositionRadius');
    this.world.scene.add(group);
  }

  addFieldBackdropCluster(group, cluster, index) {
    this.groundPatch(group, cluster.x, cluster.z, cluster.width, cluster.depth, cluster.material, 0.12, cluster.rotation, 'FieldBackdropLawn', cluster.seed);
    this.groundPatch(
      group,
      cluster.x + Math.sin(cluster.rotation) * 3.1,
      cluster.z + Math.cos(cluster.rotation) * 3.1,
      cluster.width * 0.62,
      cluster.depth * 0.48,
      this.world.materials.grassSandBlend,
      0.123,
      cluster.rotation - 0.1,
      'FieldBackdropFeather',
      cluster.seed + 5
    );
    this.fieldBackdropStats.patches += 2;
    this.addFieldBackdropFrame(group, cluster);
    this.addFieldBackdropGuideTiles(group, cluster);
    for (const asset of cluster.assets) this.addFieldBackdropAsset(group, cluster, ...asset);
    for (const [right, forward, color] of [
      [-cluster.width * 0.38, -cluster.depth * 0.34, cluster.accent.color?.getHex?.() || 0x7cffb2],
      [cluster.width * 0.36, cluster.depth * 0.32, 0xffc36a]
    ]) {
      const [x, z] = this.fieldBackdropPoint(cluster, right, forward);
      this.addFieldBackdropLamp(group, x, z, color, 2.25, `FieldBackdropLamp_${index}`);
    }
    this.fieldBackdropStats.clusters += 1;
  }

  addFieldBackdropFrame(group, cluster) {
    const frameDepth = cluster.depth * 0.39;
    for (let i = 0; i < 5; i += 1) {
      const offset = -cluster.width * 0.32 + i * (cluster.width * 0.16);
      for (const side of [-1, 1]) {
        const [x, z] = this.fieldBackdropPoint(cluster, offset, side * frameDepth);
        this.box(group, x, 0.205, z, 1.85, 0.035, 0.2, cluster.paver, cluster.rotation + side * 0.08, 'FieldBackdropFrameRun');
        this.fieldBackdropStats.frameRuns += 1;
      }
    }
  }

  addFieldBackdropGuideTiles(group, cluster) {
    for (let i = 0; i < 6; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const [x, z] = this.fieldBackdropPoint(cluster, side * cluster.width * 0.24, -5.6 + i * 2.25);
      this.box(group, x, 0.213, z, 0.24, 0.035, 1.05, cluster.accent, cluster.rotation + side * 0.06, 'FieldBackdropGuideTile');
      this.fieldBackdropStats.guideTiles += 1;
    }
  }

  addFieldBackdropAsset(group, cluster, assetName, right, forward, rotationOffset, scale) {
    const [x, z] = this.fieldBackdropPoint(cluster, right, forward);
    const placed = this.addPolishAsset(group, assetName, x, z, cluster.rotation + rotationOffset, scale);
    if (placed) this.fieldBackdropStats.authoredAssets += 1;
    return placed;
  }

  addFieldBackdropLamp(group, x, z, color, height, name) {
    this.addLamp(group, x, z, color, height, name);
    this.fieldBackdropStats.lamps += 1;
  }

  fieldBackdropPoint(cluster, right, forward) {
    return [
      cluster.x + Math.cos(cluster.rotation) * right + Math.sin(cluster.rotation) * forward,
      cluster.z - Math.sin(cluster.rotation) * right + Math.cos(cluster.rotation) * forward
    ];
  }

  createLaunchFieldFrame() {
    const group = this.registerQualityGroup(new THREE.Group(), 'secondary');
    group.name = 'SETPIECE_Launch_Field_Frame';
    const pockets = [
      {
        x: 42,
        z: 64,
        rotation: 0.18,
        width: 34,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glow,
        paver: this.world.materials.paleStone,
        seed: 1321,
        assets: [
          ['EnvPolishGardenArch', -10.4, 2.8, 0.14, 0.7],
          ['EnvPolishRouteVistaKit', 8.8, -2.8, -0.16, 0.7],
          ['EnvPolishBenchPlanter', -3.8, -6.4, 0.18, 0.66],
          ['EnvPolishRouteStoryMarker', 9.8, 5.6, -0.22, 0.64]
        ]
      },
      {
        x: 78,
        z: 78,
        rotation: -0.18,
        width: 32,
        depth: 17,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.warmStone,
        seed: 1337,
        assets: [
          ['EnvPolishSignalSpire', -9.2, 3.4, 0.12, 0.56],
          ['EnvPolishPlazaEdgeKit', 8.6, -3.6, -0.14, 0.68],
          ['EnvPolishRouteLantern', -2.8, -6.2, 0.18, 0.64],
          ['EnvPolishRouteVistaKit', 9.4, 5.2, -0.2, 0.66]
        ]
      },
      {
        x: 106,
        z: 42,
        rotation: 0.44,
        width: 30,
        depth: 16,
        material: this.world.materials.sand,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 1361,
        assets: [
          ['EnvPolishHarborSignal', -8.6, 3.6, 0.12, 0.58],
          ['EnvPolishRouteVistaKit', 8.0, -3.4, -0.16, 0.64],
          ['EnvPolishBenchPlanter', -2.6, -6.0, 0.2, 0.64],
          ['EnvPolishRouteStoryMarker', 8.6, 5.2, -0.22, 0.62]
        ]
      }
    ];

    pockets.forEach((pocket, index) => this.addLaunchFieldPocket(group, pocket, index));
    this.addLaunchFieldRouteRun(group, { x: 55, z: 52, rotation: 0.28, count: 7, color: this.world.materials.glow });
    this.addLaunchFieldRouteRun(group, { x: 88, z: 61, rotation: -0.12, count: 7, color: this.world.materials.warmGlow });
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_launch_field', cellSize: 128 });
    group.userData.launchFieldStats = { ...this.launchFieldStats };
    this.registerBroadSetPieceBatches('launchField', group, 'SETPIECE_launch_field', 'meadowCompositionRadius');
    this.world.scene.add(group);
  }

  addLaunchFieldPocket(group, pocket, index) {
    this.groundPatch(group, pocket.x, pocket.z, pocket.width, pocket.depth, pocket.material, 0.121, pocket.rotation, 'LaunchFieldLawnPatch', pocket.seed);
    this.groundPatch(
      group,
      pocket.x + Math.sin(pocket.rotation) * 3.0,
      pocket.z + Math.cos(pocket.rotation) * 3.0,
      pocket.width * 0.6,
      pocket.depth * 0.42,
      this.world.materials.grassSandBlend,
      0.124,
      pocket.rotation - 0.08,
      'LaunchFieldFeatherPatch',
      pocket.seed + 5
    );
    this.launchFieldStats.patches += 2;
    this.addLaunchFieldFrameRun(group, pocket);
    this.addLaunchFieldGuideTiles(group, pocket);
    for (const asset of pocket.assets) this.addLaunchFieldAsset(group, pocket, ...asset);
    for (const [right, forward, color] of [
      [-pocket.width * 0.38, -pocket.depth * 0.34, pocket.accent.color?.getHex?.() || 0x7cffb2],
      [pocket.width * 0.36, pocket.depth * 0.32, 0xffc36a]
    ]) {
      const [x, z] = this.launchFieldPoint(pocket, right, forward);
      this.addLamp(group, x, z, color, 2.35, `LaunchFieldLamp_${index}`);
      this.launchFieldStats.lamps += 1;
    }
    this.launchFieldStats.pockets += 1;
  }

  addLaunchFieldFrameRun(group, pocket) {
    const frameDepth = pocket.depth * 0.4;
    for (let i = 0; i < 4; i += 1) {
      const offset = -pocket.width * 0.3 + i * (pocket.width * 0.2);
      for (const side of [-1, 1]) {
        const [x, z] = this.launchFieldPoint(pocket, offset, side * frameDepth);
        this.box(group, x, 0.206, z, 1.95, 0.035, 0.22, pocket.paver, pocket.rotation + side * 0.08, 'LaunchFieldFrameRun');
        this.launchFieldStats.frameRuns += 1;
      }
    }
  }

  addLaunchFieldGuideTiles(group, pocket) {
    for (let i = 0; i < 6; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const [x, z] = this.launchFieldPoint(pocket, side * pocket.width * 0.24, -5.4 + i * 2.15);
      this.box(group, x, 0.214, z, 0.26, 0.035, 1.08, i % 2 ? pocket.accent : this.world.materials.paleStone, pocket.rotation + side * 0.06, 'LaunchFieldGuideTile');
      this.launchFieldStats.guideTiles += 1;
    }
  }

  addLaunchFieldRouteRun(group, run) {
    const rightX = Math.cos(run.rotation);
    const rightZ = -Math.sin(run.rotation);
    for (let index = 0; index < run.count; index += 1) {
      const offset = (index - (run.count - 1) / 2) * 2.35;
      const x = run.x + rightX * offset;
      const z = run.z + rightZ * offset;
      this.box(group, x, 0.222, z, 1.15, 0.035, 0.2, index % 2 ? run.color : this.world.materials.paleStone, run.rotation, 'LaunchFieldRouteGuide');
      this.launchFieldStats.guideTiles += 1;
    }
  }

  addLaunchFieldAsset(group, pocket, assetName, right, forward, rotationOffset, scale) {
    const [x, z] = this.launchFieldPoint(pocket, right, forward);
    const placed = this.addPolishAsset(group, assetName, x, z, pocket.rotation + rotationOffset, scale);
    if (placed) this.launchFieldStats.authoredAssets += 1;
    return placed;
  }

  launchFieldPoint(pocket, right, forward) {
    return [
      pocket.x + Math.cos(pocket.rotation) * right + Math.sin(pocket.rotation) * forward,
      pocket.z - Math.sin(pocket.rotation) * right + Math.cos(pocket.rotation) * forward
    ];
  }

  createInnerMeadowFrame() {
    const group = this.registerQualityGroup(new THREE.Group(), 'secondary');
    group.name = 'SETPIECE_Inner_Meadow_Frame';
    const pockets = [
      {
        x: 70,
        z: -18,
        rotation: -0.46,
        width: 34,
        depth: 18,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glow,
        paver: this.world.materials.paleStone,
        seed: 1421,
        assets: [
          ['EnvPolishSignalSpire', -9.8, 3.8, 0.12, 0.54],
          ['EnvPolishRouteVistaKit', 8.6, -3.2, -0.18, 0.66],
          ['EnvPolishTerminalBank', -2.6, -6.2, 0.2, 0.58],
          ['EnvPolishBenchPlanter', 9.4, 5.4, -0.24, 0.64]
        ]
      },
      {
        x: 96,
        z: -54,
        rotation: 0.26,
        width: 38,
        depth: 18,
        material: this.world.materials.warmStone,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.wood,
        seed: 1439,
        assets: [
          ['EnvPolishWorkshopCanopy', -10.8, 3.2, 0.12, 0.64],
          ['EnvPolishRouteStoryMarker', 9.8, -4.6, -0.18, 0.68],
          ['EnvPolishChevronBollardRun', -2.8, -6.4, 0.16, 0.7],
          ['EnvPolishRouteLantern', 10.6, 5.2, -0.22, 0.64]
        ]
      },
      {
        x: 64,
        z: -86,
        rotation: 0.12,
        width: 32,
        depth: 16,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.paleStone,
        seed: 1451,
        assets: [
          ['EnvPolishStuntArrowFence', -8.8, 3.2, 0.12, 0.64],
          ['EnvPolishRoadBarrier', 8.2, -3.4, -0.18, 0.72],
          ['EnvPolishRouteVistaKit', -2.6, -6.0, 0.18, 0.62],
          ['EnvPolishBuildCrateStack', 8.8, 5.0, -0.22, 0.56]
        ]
      },
      {
        x: 45,
        z: -28,
        rotation: -0.22,
        width: 34,
        depth: 17,
        material: this.world.materials.meadowLight,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.paleStone,
        seed: 1471,
        assets: [
          ['EnvPolishDocumentArcade', -9.2, 3.4, 0.12, 0.58],
          ['EnvPolishGardenArch', 8.4, -3.2, -0.16, 0.66],
          ['EnvPolishRouteStoryMarker', -2.4, -6.0, 0.2, 0.64],
          ['EnvPolishBenchPlanter', 9.2, 5.2, -0.22, 0.62]
        ]
      }
    ];

    pockets.forEach((pocket, index) => this.addInnerMeadowPocket(group, pocket, index));
    this.addInnerMeadowRouteRun(group, { x: 70, z: -38, rotation: -0.54, count: 8, color: this.world.materials.glow });
    this.addInnerMeadowRouteRun(group, { x: 89, z: -73, rotation: 0.16, count: 8, color: this.world.materials.warmGlow });
    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_inner_meadow', cellSize: 128 });
    group.userData.innerMeadowStats = { ...this.innerMeadowStats };
    this.registerBroadSetPieceBatches('innerMeadow', group, 'SETPIECE_inner_meadow', 'meadowCompositionRadius');
    this.world.scene.add(group);
  }

  addInnerMeadowPocket(group, pocket, index) {
    this.groundPatch(group, pocket.x, pocket.z, pocket.width, pocket.depth, pocket.material, 0.121, pocket.rotation, 'InnerMeadowLawnPatch', pocket.seed);
    this.groundPatch(
      group,
      pocket.x + Math.sin(pocket.rotation) * 3.0,
      pocket.z + Math.cos(pocket.rotation) * 3.0,
      pocket.width * 0.58,
      pocket.depth * 0.42,
      this.world.materials.grassSandBlend,
      0.124,
      pocket.rotation + 0.08,
      'InnerMeadowFeatherPatch',
      pocket.seed + 5
    );
    this.innerMeadowStats.patches += 2;
    this.addInnerMeadowFrameRun(group, pocket);
    this.addInnerMeadowGuideTiles(group, pocket);
    for (const asset of pocket.assets) this.addInnerMeadowAsset(group, pocket, ...asset);
    for (const [right, forward, color] of [
      [-pocket.width * 0.38, -pocket.depth * 0.34, pocket.accent.color?.getHex?.() || 0x7cffb2],
      [pocket.width * 0.36, pocket.depth * 0.32, 0xffc36a]
    ]) {
      const [x, z] = this.innerMeadowPoint(pocket, right, forward);
      this.addLamp(group, x, z, color, 2.3, `InnerMeadowLamp_${index}`);
      this.innerMeadowStats.lamps += 1;
    }
    this.innerMeadowStats.pockets += 1;
  }

  addInnerMeadowFrameRun(group, pocket) {
    const frameDepth = pocket.depth * 0.4;
    for (let i = 0; i < 4; i += 1) {
      const offset = -pocket.width * 0.3 + i * (pocket.width * 0.2);
      for (const side of [-1, 1]) {
        const [x, z] = this.innerMeadowPoint(pocket, offset, side * frameDepth);
        this.box(group, x, 0.206, z, 1.85, 0.035, 0.22, pocket.paver, pocket.rotation + side * 0.08, 'InnerMeadowFrameRun');
        this.innerMeadowStats.frameRuns += 1;
      }
    }
  }

  addInnerMeadowGuideTiles(group, pocket) {
    for (let i = 0; i < 6; i += 1) {
      const side = i % 2 === 0 ? -1 : 1;
      const [x, z] = this.innerMeadowPoint(pocket, side * pocket.width * 0.24, -5.2 + i * 2.05);
      this.box(group, x, 0.214, z, 0.26, 0.035, 1.02, i % 2 ? pocket.accent : this.world.materials.paleStone, pocket.rotation + side * 0.06, 'InnerMeadowGuideTile');
      this.innerMeadowStats.guideTiles += 1;
    }
  }

  addInnerMeadowRouteRun(group, run) {
    const rightX = Math.cos(run.rotation);
    const rightZ = -Math.sin(run.rotation);
    for (let index = 0; index < run.count; index += 1) {
      const offset = (index - (run.count - 1) / 2) * 2.2;
      const x = run.x + rightX * offset;
      const z = run.z + rightZ * offset;
      this.box(group, x, 0.222, z, 1.05, 0.035, 0.2, index % 2 ? run.color : this.world.materials.paleStone, run.rotation, 'InnerMeadowRouteGuide');
      this.innerMeadowStats.guideTiles += 1;
    }
  }

  addInnerMeadowAsset(group, pocket, assetName, right, forward, rotationOffset, scale) {
    const [x, z] = this.innerMeadowPoint(pocket, right, forward);
    const placed = this.addPolishAsset(group, assetName, x, z, pocket.rotation + rotationOffset, scale);
    if (placed) this.innerMeadowStats.authoredAssets += 1;
    return placed;
  }

  innerMeadowPoint(pocket, right, forward) {
    return [
      pocket.x + Math.cos(pocket.rotation) * right + Math.sin(pocket.rotation) * forward,
      pocket.z - Math.sin(pocket.rotation) * right + Math.cos(pocket.rotation) * forward
    ];
  }

  createSouthCorridorForeground() {
    const group = this.registerQualityGroup(new THREE.Group(), 'secondary');
    group.name = 'SETPIECE_South_Corridor_Foreground';
    const clusters = [
      {
        x: -30,
        z: -68,
        rotation: 0.18,
        width: 36,
        depth: 18,
        material: this.world.materials.paleStone,
        accent: this.world.materials.glowBlue,
        paver: this.world.materials.plazaRoad,
        seed: 1201,
        assets: [
          ['EnvPolishDocumentArcade', -11.2, 2.8, 0.12, 0.72],
          ['EnvPolishRouteStoryMarker', 9.4, -4.6, -0.18, 0.72],
          ['EnvPolishRouteVistaKit', -2.6, -6.8, 0.18, 0.7],
          ['EnvPolishBenchPlanter', 10.6, 5.0, -0.24, 0.7]
        ]
      },
      {
        x: -42,
        z: -94,
        rotation: 0.34,
        width: 36,
        depth: 18,
        material: this.world.materials.wood,
        accent: this.world.materials.warmGlow,
        paver: this.world.materials.meadowDark,
        seed: 1211,
        assets: [
          ['EnvPolishBuildWorkbench', -10.6, 2.8, 0.18, 0.66],
          ['EnvPolishWorkshopCanopy', 8.8, -3.8, -0.16, 0.7],
          ['EnvPolishTerminalCanopy', -1.8, -6.6, 0.2, 0.62],
          ['EnvPolishRouteStoryMarker', 10.2, 5.2, -0.24, 0.66]
        ]
      },
      {
        x: 4,
        z: -82,
        rotation: -0.24,
        width: 30,
        depth: 16,
        material: this.world.materials.meadowDark,
        accent: this.world.materials.glow,
        paver: this.world.materials.paleStone,
        seed: 1223,
        assets: [
          ['EnvPolishChevronBollardRun', -8.8, 2.8, 0.16, 0.7],
          ['EnvPolishYardEdgeTrim', 8.0, -3.6, -0.18, 0.72],
          ['EnvPolishRouteStoryMarker', -1.8, -5.6, 0.18, 0.66],
          ['EnvPolishBenchPlanter', 8.6, 4.8, -0.22, 0.66]
        ]
      }
    ];

    clusters.forEach((cluster, index) => this.addSouthCorridorCluster(group, cluster, index));
    this.addSouthCorridorRouteRun(group, { x: -13, z: -72, rotation: 0.42, count: 9, color: this.world.materials.glowBlue });
    this.addSouthCorridorRouteRun(group, { x: -29, z: -88, rotation: 0.56, count: 8, color: this.world.materials.warmGlow });
    this.addSouthCorridorRailRun(group, -45, -76, 0.18, 17, this.world.materials.paleStone);
    this.addSouthCorridorRailRun(group, -55, -99, 0.34, 16, this.world.materials.wood);
    this.addSouthCorridorRailRun(group, 4, -94, -0.24, 14, this.world.materials.paleStone);

    mergeStaticMeshesInGroup(group, { namePrefix: 'SETPIECE_south_corridor', cellSize: 42 });
    group.userData.southCorridorStats = { ...this.southCorridorStats };
    this.registerBroadSetPieceBatches('southCorridor', group, 'SETPIECE_south_corridor', 'routeCompositionRadius');
    this.world.scene.add(group);
  }

  addSouthCorridorCluster(group, cluster, index) {
    this.groundPatch(group, cluster.x, cluster.z, cluster.width, cluster.depth, cluster.material, 0.122, cluster.rotation, 'SouthCorridorYardPatch', cluster.seed);
    this.groundPatch(
      group,
      cluster.x + Math.sin(cluster.rotation) * 3,
      cluster.z + Math.cos(cluster.rotation) * 3,
      cluster.width * 0.62,
      cluster.depth * 0.42,
      cluster.paver,
      0.126,
      cluster.rotation + 0.12,
      'SouthCorridorInsetPatch',
      cluster.seed + 7
    );
    this.southCorridorStats.clusters += 1;
    this.southCorridorStats.patches += 2;

    for (const asset of cluster.assets) this.addSouthCorridorAsset(group, cluster, ...asset);

    for (const [right, forward, color] of [
      [-cluster.width * 0.36, -cluster.depth * 0.34, cluster.accent.color?.getHex?.() || 0x92ffea],
      [cluster.width * 0.34, cluster.depth * 0.34, 0xffc36a]
    ]) {
      const [lampX, lampZ] = this.southCorridorPoint(cluster, right, forward);
      this.addSouthCorridorLamp(group, lampX, lampZ, color, 2.35, 'SouthCorridorLamp');
    }

    for (let i = -3; i <= 3; i += 1) {
      const [tileX, tileZ] = this.southCorridorPoint(cluster, i * 2.25, -cluster.depth * 0.16 + Math.sin(i + index) * 0.7);
      this.box(group, tileX, 0.218, tileZ, 1.45, 0.035, 0.22, i % 2 ? cluster.accent : this.world.materials.paleStone, cluster.rotation + 0.08, 'SouthCorridorGuideTile');
      this.southCorridorStats.guideTiles += 1;
    }
  }

  addSouthCorridorRouteRun(group, run) {
    const rightX = Math.cos(run.rotation);
    const rightZ = -Math.sin(run.rotation);
    for (let index = 0; index < run.count; index += 1) {
      const offset = (index - (run.count - 1) / 2) * 2.2;
      const x = run.x + rightX * offset;
      const z = run.z + rightZ * offset;
      this.box(group, x, 0.224, z, 1.18, 0.035, 0.18, index % 2 ? run.color : this.world.materials.paleStone, run.rotation, 'SouthCorridorRouteGuide');
      this.southCorridorStats.guideTiles += 1;
    }
  }

  addSouthCorridorRailRun(group, x, z, rotation, length, material) {
    const count = Math.max(3, Math.floor(length / 3.2));
    const rightX = Math.cos(rotation);
    const rightZ = -Math.sin(rotation);
    for (let index = 0; index < count; index += 1) {
      const offset = (index - (count - 1) / 2) * 3.2;
      this.box(group, x + rightX * offset, 0.62, z + rightZ * offset, 0.14, 0.96, 0.14, this.world.materials.darkWood, rotation, 'SouthCorridorRailPost');
    }
    this.box(group, x, 0.92, z, length, 0.1, 0.12, material, rotation, 'SouthCorridorRailTop');
    this.box(group, x, 0.5, z, length * 0.94, 0.08, 0.1, this.world.materials.wood, rotation, 'SouthCorridorRailLow');
    this.southCorridorStats.railRuns += 1;
  }

  addSouthCorridorAsset(group, cluster, assetName, right, forward, rotationOffset, scale) {
    const [x, z] = this.southCorridorPoint(cluster, right, forward);
    const placed = this.addPolishAsset(group, assetName, x, z, cluster.rotation + rotationOffset, scale);
    if (placed) this.southCorridorStats.authoredAssets += 1;
    return placed;
  }

  addSouthCorridorLamp(group, x, z, color, height, name) {
    this.addLamp(group, x, z, color, height, name);
    this.southCorridorStats.lamps += 1;
  }

  southCorridorPoint(cluster, right, forward) {
    return [
      cluster.x + Math.cos(cluster.rotation) * right + Math.sin(cluster.rotation) * forward,
      cluster.z - Math.sin(cluster.rotation) * right + Math.cos(cluster.rotation) * forward
    ];
  }

  createLivingSignals() {
    const group = new THREE.Group();
    group.name = 'SETPIECE_Living_Signals';
    const zones = worldZones;

    this.createZonePulseInstances(group, zones);

    const bannerSpecs = [
      [-24, 28, 0.18, 0x7cffb2],
      [-52, 54, 0.52, 0x9ccfff],
      [-86, -28, -0.48, 0x68d8ff],
      [18, -18, 0.34, 0xe6f3ff],
      [58, -78, -0.72, 0xff9b6d],
      [102, 50, 0.86, 0x78b7ff],
      [-112, 54, 0.68, 0x79ffc5],
      [-42, -116, -0.2, 0xc79b56],
      [26, 96, 0.18, 0xff6d8d],
      [78, 18, -0.62, 0xb6a0ff]
    ];
    bannerSpecs.forEach(([x, z, rotation, color], index) => this.addWindBanner(group, x, z, rotation, color, index));

    const whisperSpecs = [
      [-40, 42, 0x9ccfff, 'Campus lamps are pulling you toward FCC Grove.'],
      [-68, 78, 0x9ccfff, 'The S-block facade stays exact; the plaza does the staging.'],
      [-36, 2, 0x68d8ff, 'Scanner road ahead. Keep the car straight through the blue gate.'],
      [-92, -42, 0x68d8ff, 'Security packets orbit the lab when the scan wakes up.'],
      [22, -34, 0xe6f3ff, 'The document run bends toward the CV vault.'],
      [78, -92, 0xff9b6d, 'Rubber marks mean the stunt loop is live.'],
      [84, 48, 0xffcc66, 'Workshop lights mark the project yard entrance.'],
      [116, 60, 0x78b7ff, 'Harbor signals point back to contact links.'],
      [-126, 58, 0x79ffc5, 'Data shards hum along the pier route.'],
      [-28, -94, 0xa8a6ff, 'Behind the build sits under the south work lights.']
    ];
    this.createWhisperBeaconInstances(group, whisperSpecs);

    const terminalSpecs = [
      [-94, -66, 0x68d8ff],
      [62, 56, 0xffcc66],
      [-62, -84, 0x92ffea],
      [8, -58, 0xe6f3ff],
      [-18, -96, 0xa8a6ff],
      [128, 56, 0x78b7ff]
    ];
    this.createTerminalPulseInstances(group, terminalSpecs);
    this.createDistrictSignalInstances(group, zones);

    this.world.scene.add(group);
  }

  createDistrictAmbience() {
    const zones = worldZones;
    const mesh = new THREE.InstancedMesh(
      new THREE.OctahedronGeometry(0.34, 0),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        opacity: 0.74,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      }),
      zones.length * 4
    );
    mesh.name = 'Life_DistrictAmbience_Motes';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.districtAmbience.mesh = mesh;
    this.lifeInstanceMeshes.push(mesh);

    for (let layer = 0; layer < 4; layer += 1) {
      zones.forEach((zone, zoneIndex) => {
        const index = this.districtAmbience.entries.length;
        const radius = zone.radius * (0.62 + layer * 0.19);
        const phase = zoneIndex * 0.73 + layer * 1.37;
        const baseAngle = phase + layer * 0.48;
        const entry = {
          index,
          centerX: zone.position[0],
          centerZ: zone.position[2],
          radius,
          baseAngle,
          baseY: 1.05 + layer * 0.28 + (zoneIndex % 3) * 0.08,
          speed: 0.22 + layer * 0.045 + (zoneIndex % 4) * 0.012,
          bob: 0.18 + layer * 0.035,
          phase,
          scale: 0.72 + layer * 0.11
        };
        mesh.setColorAt(index, new THREE.Color(zone.color));
        this.districtAmbience.entries.push(entry);
        this.writeDistrictAmbience(entry, 0);
      });
    }
    this.lifeStats.districtMotes = this.districtAmbience.entries.length;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
    this.world.scene.add(mesh);
  }

  applyDistrictAmbienceLimit(limit) {
    const mesh = this.districtAmbience.mesh;
    if (!mesh) return;
    const visible = Math.min(this.districtAmbience.entries.length, Number.isFinite(limit) ? limit : this.districtAmbience.entries.length);
    this.districtAmbience.visible = visible;
    mesh.count = visible;
    this.lifeStats.visibleDistrictMotes = visible;
    this.updateDistrictAmbience(0);
  }

  updateDistrictAmbience(elapsed) {
    const mesh = this.districtAmbience.mesh;
    if (!mesh) return;
    for (let index = 0; index < this.districtAmbience.visible; index += 1) {
      this.writeDistrictAmbience(this.districtAmbience.entries[index], elapsed);
    }
    mesh.instanceMatrix.needsUpdate = true;
    this.lifeStats.motionSamples += this.districtAmbience.visible;
  }

  createZonePulseInstances(group, zones) {
    const geometry = new THREE.RingGeometry(0.88, 1, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.052,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.InstancedMesh(geometry, material, zones.length);
    mesh.name = 'Life_ZonePulse_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    let maxZonePulseScale = 0;
    for (const zone of zones) {
      const index = this.lifeStats.zonePulses;
      mesh.setColorAt(index, new THREE.Color(zone.color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_ZonePulse_${zone.id}`;
      proxy.position.set(zone.position[0], 0.245, zone.position[2]);
      proxy.rotation.x = -Math.PI / 2;
      proxy.rotation.z = Math.PI / 4;
      group.add(proxy);
      const entry = {
        kind: 'pulse',
        instanceKind: 'zonePulse',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        scale: Math.max(3.2, zone.radius * 0.43 + 0.8),
        baseScale: 1,
        baseRotation: Math.PI / 4,
        range: 0.018,
        speed: 0.9 + (index % 5) * 0.08,
        phase: index * 0.73,
        rotationSpeed: 0.18
      };
      maxZonePulseScale = Math.max(maxZonePulseScale, entry.scale);
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.zonePulses.push({ root: proxy, entry });
      this.lifeStats.zonePulses += 1;
    }
    mesh.userData.maxZonePulseScale = Number(maxZonePulseScale.toFixed(2));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  createWhisperBeaconInstances(group, specs) {
    const geometry = new THREE.OctahedronGeometry(0.42, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false
    });
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = 'Life_WhisperBeacon_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    specs.forEach(([x, z, color, message], index) => {
      mesh.setColorAt(index, new THREE.Color(color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_WhisperBeacon_${index}`;
      proxy.position.set(x, 1.45 + (index % 3) * 0.12, z);
      proxy.userData.whisper = message;
      group.add(proxy);
      const entry = {
        index,
        kind: 'beacon',
        instanceKind: 'beacon',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        baseY: proxy.position.y,
        scale: 1,
        range: 0.34,
        speed: 1.2 + index * 0.05,
        phase: index * 0.7,
        rotationSpeed: 0.7 + index * 0.03,
        message,
        color,
        active: true
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.whisperBeacons.push({ root: proxy, entry });
      this.whisperEntries.push(entry);
      this.lifeStats.whisperBeacons += 1;
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  createTerminalPulseInstances(group, specs) {
    const geometry = new THREE.RingGeometry(1.1, 1.34, 5);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.InstancedMesh(geometry, material, specs.length);
    mesh.name = 'Life_TerminalPulse_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    specs.forEach(([x, z, color], index) => {
      mesh.setColorAt(index, new THREE.Color(color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_TerminalPulse_${index}`;
      proxy.position.set(x, 1.15 + (index % 2) * 0.18, z);
      proxy.rotation.x = -Math.PI / 2;
      group.add(proxy);
      const entry = {
        kind: 'pulse',
        instanceKind: 'terminalPulse',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position: proxy.position.clone(),
        scale: 1,
        baseScale: 1,
        baseRotation: 0,
        range: 0.18,
        speed: 1.35 + index * 0.11,
        phase: index * 0.44,
        rotationSpeed: 0.65
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.terminalPulses.push({ root: proxy, entry });
      this.lifeStats.terminalPulses += 1;
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  createDistrictSignalInstances(group, zones) {
    const geometry = new THREE.ConeGeometry(0.48, 1.7, 5, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.InstancedMesh(geometry, material, zones.length);
    mesh.name = 'Life_DistrictSignal_instances';
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    group.add(mesh);
    this.lifeInstanceMeshes.push(mesh);

    zones.forEach((zone, index) => {
      const angle = index * 2.399;
      const radius = Math.min(8.2, zone.radius * 0.44);
      const position = new THREE.Vector3(
        zone.position[0] + Math.cos(angle) * radius,
        2.15 + (index % 4) * 0.18,
        zone.position[2] + Math.sin(angle) * radius
      );
      mesh.setColorAt(index, new THREE.Color(zone.color));
      const proxy = new THREE.Object3D();
      proxy.name = `Life_DistrictSignal_${zone.id}`;
      proxy.position.copy(position);
      group.add(proxy);
      const entry = {
        kind: 'pulse',
        instanceKind: 'districtSignal',
        instanceMesh: mesh,
        instanceIndex: index,
        proxy,
        position,
        baseY: position.y,
        scale: 1.55 + (index % 3) * 0.12,
        range: 0.1,
        bob: 0.18,
        speed: 0.95 + (index % 5) * 0.06,
        phase: index * 0.59,
        rotationSpeed: 0.22 + (index % 4) * 0.03,
        active: true
      };
      this.writeLifeInstance(entry, 0);
      this.animated.push(entry);
      this.lifeItems.districtSignals.push({ root: proxy, entry });
      this.lifeStats.districtSignals += 1;
    });
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.instanceMatrix.needsUpdate = true;
  }

  writeLifeInstance(entry, elapsed) {
    if (entry.active === false) {
      this.lifeDummy.position.set(0, -1000, 0);
      this.lifeDummy.rotation.set(0, 0, 0);
      this.lifeDummy.scale.setScalar(0.001);
      if (entry.proxy) entry.proxy.visible = false;
    } else if (entry.instanceKind === 'beacon') {
      const y = entry.baseY + Math.sin(elapsed * entry.speed + entry.phase) * entry.range;
      this.lifeDummy.position.set(entry.position.x, y, entry.position.z);
      this.lifeDummy.rotation.set(0, elapsed * entry.rotationSpeed + entry.phase, 0);
      this.lifeDummy.scale.setScalar(entry.scale);
      if (entry.proxy) {
        entry.proxy.visible = true;
        entry.proxy.position.copy(this.lifeDummy.position);
        entry.proxy.rotation.copy(this.lifeDummy.rotation);
      }
      this.lifeStats.motionSamples += 1;
    } else if (entry.instanceKind === 'districtSignal') {
      const phase = elapsed * entry.speed + entry.phase;
      const y = entry.baseY + Math.sin(phase) * entry.bob;
      const widthPulse = 0.9 + Math.sin(phase * 1.2) * entry.range;
      const heightPulse = 1.08 + Math.cos(phase) * entry.range;
      this.lifeDummy.position.set(entry.position.x, y, entry.position.z);
      this.lifeDummy.rotation.set(0, elapsed * entry.rotationSpeed + entry.phase, 0);
      this.lifeDummy.scale.set(entry.scale * widthPulse, entry.scale * heightPulse, entry.scale * widthPulse);
      if (entry.proxy) {
        entry.proxy.visible = true;
        entry.proxy.position.copy(this.lifeDummy.position);
        entry.proxy.rotation.copy(this.lifeDummy.rotation);
      }
      this.lifeStats.motionSamples += 1;
    } else {
      const pulse = entry.baseScale + Math.sin(elapsed * entry.speed + entry.phase) * entry.range;
      const scale = entry.scale * pulse;
      const rotationZ = entry.baseRotation + elapsed * entry.rotationSpeed;
      this.lifeDummy.position.copy(entry.position);
      this.lifeDummy.rotation.set(-Math.PI / 2, 0, rotationZ);
      this.lifeDummy.scale.set(scale, scale, scale);
      if (entry.proxy) {
        entry.proxy.visible = true;
        entry.proxy.position.copy(entry.position);
        entry.proxy.rotation.copy(this.lifeDummy.rotation);
        entry.proxy.scale.setScalar(pulse);
      }
      this.lifeStats.motionSamples += 1;
    }
    this.lifeDummy.updateMatrix();
    entry.instanceMesh.setMatrixAt(entry.instanceIndex, this.lifeDummy.matrix);
  }

  writeDistrictAmbience(entry, elapsed) {
    const angle = entry.baseAngle + elapsed * entry.speed;
    const drift = Math.sin(elapsed * (entry.speed * 1.8) + entry.phase) * 0.34;
    const x = entry.centerX + Math.cos(angle) * entry.radius + Math.cos(angle * 1.7) * drift;
    const z = entry.centerZ + Math.sin(angle) * entry.radius + Math.sin(angle * 1.3) * drift;
    const y = entry.baseY + Math.sin(elapsed * 1.05 + entry.phase) * entry.bob;
    const pulse = entry.scale * (0.86 + Math.sin(elapsed * 1.45 + entry.phase) * 0.14);
    this.ambienceDummy.position.set(x, y, z);
    this.ambienceDummy.rotation.set(elapsed * 0.42 + entry.phase, elapsed * 0.68 + entry.phase, elapsed * 0.31);
    this.ambienceDummy.scale.setScalar(pulse);
    this.ambienceDummy.updateMatrix();
    this.districtAmbience.mesh.setMatrixAt(entry.index, this.ambienceDummy.matrix);
  }

  groundRect(group, x, z, width, depth, material, y, name, rotation = 0) {
    const mesh = new THREE.Mesh(makeHardscapePanelGeometry(width, depth, panelSeed(name, x, z)), material);
    mesh.name = name;
    mesh.position.set(x, y + 0.026, z);
    mesh.rotation.y = rotation;
    mesh.receiveShadow = true;
    mesh.userData.surfacePanel = 'chipped-hardscape';
    group.add(mesh);
    if (!((this.world.verticalSliceMode || this.world.foundationReplacementMode) && (name.startsWith('BLOCKOUT_') || name.startsWith('FOUNDATION_')))) {
      this.addGroundPanelSeams(group, x, z, width, depth, material, y + 0.058, name, rotation);
    }
    this.surfacePanelStats.hardscapePanels += 1;
    this.surfacePanelStats.chippedPanels += 1;
  }

  groundPatch(group, x, z, width, depth, material, y, rotation, name, seed) {
    const mesh = new THREE.Mesh(makePatchGeometry(width, depth, seed), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  box(group, x, y, z, sx, sy, sz, material, rotation = 0, name = 'SetPieceBox') {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  addGroundPanelSeams(group, x, z, width, depth, material, y, name, rotation = 0) {
    const seamMaterial = this.panelSeamMaterial(material);
    const long = Math.max(width, depth);
    const short = Math.min(width, depth);
    const edgeInset = Math.max(0.9, short * 0.08);
    const strips = [
      [0, -depth * 0.5 + edgeInset, width * 0.68, 0.1, 0],
      [0, depth * 0.5 - edgeInset, width * 0.58, 0.1, 0],
      [-width * 0.5 + edgeInset, 0, 0.1, depth * 0.62, 0],
      [width * 0.5 - edgeInset, 0, 0.1, depth * 0.54, 0]
    ];
    if (long > 13) {
      strips.push([0, 0, width * 0.46, 0.08, 0]);
    }
    for (let index = 0; index < strips.length; index += 1) {
      const [dx, dz, sx, sz, localRotation] = strips[index];
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const seam = new THREE.Mesh(new THREE.BoxGeometry(sx, 0.018, sz), seamMaterial);
      seam.name = `${name}_PanelSeam_${index}`;
      seam.position.set(x + dx * cos + dz * sin, y + index * 0.0006, z - dx * sin + dz * cos);
      seam.rotation.y = rotation + localRotation;
      seam.receiveShadow = false;
      seam.renderOrder = 42;
      group.add(seam);
      this.surfacePanelStats.seamStrips += 1;
    }
  }

  panelSeamMaterial(baseMaterial) {
    const key = baseMaterial.uuid;
    if (this.panelSeamMaterials.has(key)) return this.panelSeamMaterials.get(key);
    const color = baseMaterial.color?.clone?.() || new THREE.Color(0x3b463f);
    const brightness = (color.r + color.g + color.b) / 3;
    if (brightness < 0.35) {
      color.lerp(new THREE.Color(0x68d8ff), 0.58);
    } else {
      color.multiplyScalar(0.42);
    }
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: brightness < 0.35 ? 0.18 : 0.16,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -46,
      polygonOffsetUnits: -46
    });
    this.panelSeamMaterials.set(key, material);
    return material;
  }

  cylinder(group, x, y, z, radius, height, material, sides = 16, name = 'SetPieceCylinder') {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), material);
    mesh.name = name;
    mesh.position.set(x, y, z);
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
    return mesh;
  }

  addLamp(group, x, z, color, height, name, rotation = null) {
    const lamp = new THREE.Group();
    lamp.name = name;
    this.cylinder(lamp, 0, height / 2, 0, 0.08, height, this.world.materials.darkWood, 8, `${name}_Post`);
    this.box(lamp, 0.34, height - 0.08, 0, 0.82, 0.08, 0.08, this.world.materials.darkWood, 0, `${name}_Arm`);
    const glow = new THREE.Mesh(this.getLampGlowGeometry(color), this.lampGlowMaterial);
    glow.name = `${name}_Glow`;
    glow.position.set(0.78, height - 0.34, 0);
    lamp.add(glow);
    lamp.position.set(x, 0.16, z);
    lamp.rotation.y = Number.isFinite(rotation) ? rotation : Math.sin(x * 0.2 + z * 0.1) * 0.35;
    group.add(lamp);
  }

  getLampGlowGeometry(color) {
    const key = new THREE.Color(color).getHexString();
    if (!this.lampGlowGeometries.has(key)) {
      const geometry = this.lampGlowGeometry.clone();
      const count = geometry.getAttribute('position').count;
      const colors = new Float32Array(count * 3);
      const vertexColor = new THREE.Color(color);
      for (let index = 0; index < count; index += 1) {
        colors[index * 3] = vertexColor.r;
        colors[index * 3 + 1] = vertexColor.g;
        colors[index * 3 + 2] = vertexColor.b;
      }
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      this.lampGlowGeometries.set(key, geometry);
    }
    return this.lampGlowGeometries.get(key);
  }

  getBeaconGlowMaterial(color) {
    const key = new THREE.Color(color).getHexString();
    if (!this.beaconGlowMaterials.has(key)) {
      this.beaconGlowMaterials.set(key, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 }));
    }
    return this.beaconGlowMaterials.get(key);
  }

  addSign(group, title, subtitle, x, z, rotation, color, scale, name) {
    const sign = new THREE.Group();
    sign.name = name;
    const compactScale = scale * 0.78;
    this.cylinder(sign, -0.96 * compactScale, 0.72, 0, 0.055, 1.44, this.world.materials.darkWood, 8, `${name}_PostLeft`);
    this.cylinder(sign, 0.96 * compactScale, 0.72, 0, 0.055, 1.44, this.world.materials.darkWood, 8, `${name}_PostRight`);
    const { material, rect } = this.allocateSignPanel(title, subtitle, color);
    const geometry = createSignBoardGeometry(2.28 * compactScale, 0.86 * compactScale, rect);
    const front = new THREE.Mesh(geometry, material);
    front.name = `${name}_BoardFront`;
    front.position.y = 1.32;
    front.position.z = 0.025;
    const back = new THREE.Mesh(geometry, material);
    back.name = `${name}_BoardBack`;
    back.position.y = 1.32;
    back.position.z = -0.025;
    back.rotation.y = Math.PI;
    sign.add(front, back);
    sign.position.set(x, 0.16, z);
    sign.rotation.y = rotation;
    group.add(sign);
  }

  allocateSignPanel(title, subtitle, color) {
    if (!this.signAtlas) this.signAtlas = createSignAtlas();
    const atlas = this.signAtlas;
    const index = atlas.cursor;
    atlas.cursor += 1;
    const column = index % atlas.columns;
    const row = Math.floor(index / atlas.columns);
    if (row >= atlas.rows) {
      throw new Error('Sign atlas capacity exceeded');
    }
    const x = column * atlas.tileWidth;
    const y = row * atlas.tileHeight;
    drawSignPanel(atlas.context, x, y + 18, title, subtitle, color);
    atlas.texture.needsUpdate = true;
    return {
      material: atlas.material,
      rect: {
        u0: x / atlas.canvas.width,
        u1: (x + atlas.tileWidth) / atlas.canvas.width,
        v0: 1 - (y + atlas.tileHeight) / atlas.canvas.height,
        v1: 1 - y / atlas.canvas.height
      }
    };
  }

  addBench(group, x, z, rotation, scale) {
    const bench = this.world.cloneEnvironmentAsset('EnvBench') || this.createBenchFallback();
    bench.name = 'SetPieceBench';
    bench.position.set(x, 0.18, z);
    bench.rotation.y = rotation;
    bench.scale.setScalar(scale);
    group.add(bench);
  }

  addPolishAsset(group, assetName, x, z, rotation, scale) {
    const asset = this.world.cloneEnvironmentAsset(assetName);
    if (!asset) return false;
    this.applyPolishMaterialLibrary(asset);
    asset.name = `SetPiece_${assetName}`;
    asset.position.set(x, 0.16, z);
    asset.rotation.y = rotation;
    asset.scale.setScalar(scale);
    group.add(asset);
    return true;
  }

  applyPolishMaterialLibrary(root) {
    root.traverse((object) => {
      if (!object.isMesh || !object.material) return;
      if (Array.isArray(object.material)) {
        object.material = object.material.map((material) => this.resolvePolishMaterial(material));
        return;
      }
      object.material = this.resolvePolishMaterial(object.material);
    });
  }

  resolvePolishMaterial(material) {
    const materialName = material?.name || '';
    const materialKey = POLISH_MATERIAL_LIBRARY_KEYS[materialName];
    if (!materialKey) {
      this.polishMaterialStats.untouched += 1;
      return material;
    }
    const replacement = this.world.materials?.[materialKey];
    if (!replacement) {
      this.polishMaterialStats.missingReplacement += 1;
      return material;
    }
    this.polishMaterialStats.remapped += 1;
    return replacement;
  }

  addDistrictStoryAsset(group, assetName, x, z, rotation, scale, statName) {
    const placed = this.addPolishAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.districtStoryStats.authoredAssets += 1;
    this.districtStoryStats[statName] = (this.districtStoryStats[statName] || 0) + 1;
    return true;
  }

  createCvDocumentLife(group, cv) {
    const geometry = new THREE.PlaneGeometry(0.72, 0.96);
    const material = new THREE.MeshBasicMaterial({
      color: 0xe6f3ff,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const pages = [
      [-7.1, -2.6, 1.18, -0.46, 0.82, 0.00],
      [-5.8, -0.7, 1.74, -0.28, 0.74, 0.45],
      [-4.2, 1.4, 2.12, -0.08, 0.68, 0.94],
      [-2.4, 3.2, 1.68, 0.16, 0.72, 1.36],
      [-0.4, 4.1, 1.34, 0.32, 0.76, 1.82],
      [1.9, 3.8, 1.9, 0.52, 0.7, 2.28],
      [4.1, 2.6, 2.24, 0.74, 0.66, 2.74],
      [5.8, 0.7, 1.58, 0.92, 0.72, 3.16],
      [6.8, -1.7, 1.26, 1.08, 0.78, 3.62],
      [3.4, -3.2, 1.46, 0.72, 0.64, 4.08],
      [0.8, -3.8, 2.02, 0.34, 0.68, 4.54],
      [-2.8, -3.5, 1.54, -0.04, 0.74, 5.0]
    ];
    const mesh = new THREE.InstancedMesh(geometry, material, pages.length);
    mesh.name = 'CvDocumentStream';
    mesh.frustumCulled = false;
    mesh.renderOrder = 42;
    group.add(mesh);

    const entries = pages.map(([dx, dz, y, yaw, scale, phase], index) => ({
      index,
      x: cv.position[0] + dx,
      z: cv.position[2] + dz,
      baseY: y,
      yaw,
      scale,
      phase,
      speed: 0.72 + index * 0.035,
      bob: 0.18 + (index % 3) * 0.035,
      roll: (index % 2 === 0 ? -1 : 1) * (0.12 + index * 0.006)
    }));

    this.districtStoryStats.documentPages += pages.length;
    this.districtStoryStats.documentStreams += 1;
    this.animated.push({ kind: 'cvDocumentStream', mesh, entries });
    this.updateCvDocumentStream({ mesh, entries }, 0);
  }

  updateCvDocumentStream(stream, elapsed) {
    if (!stream.mesh?.visible) return;
    for (const entry of stream.entries) {
      const phase = elapsed * entry.speed + entry.phase;
      const lateral = Math.sin(phase * 0.72) * 0.08;
      this.lifeDummy.position.set(entry.x + lateral, entry.baseY + Math.sin(phase) * entry.bob, entry.z);
      this.lifeDummy.rotation.set(0, entry.yaw + Math.sin(phase * 0.64) * 0.18, entry.roll + Math.sin(phase * 1.18) * 0.16);
      this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.4) * 0.035);
      this.lifeDummy.updateMatrix();
      stream.mesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
    }
    if (stream.mesh.material) {
      stream.mesh.material.opacity = 0.72 + Math.sin(elapsed * 1.1) * 0.08;
    }
    stream.mesh.instanceMatrix.needsUpdate = true;
    this.lifeStats.motionSamples += stream.entries.length;
  }

  createProjectsYardLife(group, projects) {
    const sparkGeometry = new THREE.TetrahedronGeometry(0.18, 0);
    const sparkMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc66,
      transparent: true,
      opacity: 0.8,
      depthWrite: false
    });
    const sparkCount = 18;
    const sparkMesh = new THREE.InstancedMesh(sparkGeometry, sparkMaterial, sparkCount);
    sparkMesh.name = 'ProjectsYardForgeSparks';
    sparkMesh.frustumCulled = false;
    sparkMesh.renderOrder = 43;
    group.add(sparkMesh);

    const cardGeometry = new THREE.PlaneGeometry(0.92, 0.56);
    const cardMaterial = new THREE.MeshBasicMaterial({
      color: 0x68d8ff,
      transparent: true,
      opacity: 0.64,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const cardSpecs = [
      [-3.8, 1.7, 1.58, -0.42, 0.72, 0.0],
      [-1.1, 2.5, 2.06, -0.28, 0.66, 0.6],
      [2.2, 2.2, 1.78, -0.08, 0.7, 1.2],
      [5.1, 0.8, 2.24, 0.18, 0.62, 1.8],
      [8.2, 3.4, 1.72, -0.64, 0.68, 2.4],
      [10.3, 6.2, 2.02, -0.72, 0.58, 3.0],
      [12.4, -1.6, 1.52, -0.38, 0.64, 3.6]
    ];
    const cardMesh = new THREE.InstancedMesh(cardGeometry, cardMaterial, cardSpecs.length);
    cardMesh.name = 'ProjectsYardBuildCards';
    cardMesh.frustumCulled = false;
    cardMesh.renderOrder = 44;
    group.add(cardMesh);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xff9b6d,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.28, 1.4, 7), ringMaterial);
    ring.name = 'ProjectsYardAssemblyRing';
    ring.position.set(projects.position[0] + 4.6, 2.15, projects.position[2] + 1.8);
    ring.rotation.y = -0.52;
    ring.renderOrder = 45;
    group.add(ring);

    const sparkEntries = Array.from({ length: sparkCount }, (_, index) => {
      const angle = index * 2.399;
      const radius = 0.32 + (index % 5) * 0.13;
      return {
        index,
        baseX: projects.position[0] + 4.6 + Math.cos(angle) * radius,
        baseZ: projects.position[2] + 1.8 + Math.sin(angle) * radius,
        driftX: Math.cos(angle + 0.7) * (0.42 + (index % 3) * 0.12),
        driftZ: Math.sin(angle + 0.7) * (0.42 + (index % 3) * 0.12),
        phase: index / sparkCount,
        speed: 0.58 + (index % 4) * 0.035
      };
    });
    const cardEntries = cardSpecs.map(([dx, dz, y, yaw, scale, phase], index) => ({
      index,
      x: projects.position[0] + dx,
      z: projects.position[2] + dz,
      baseY: y,
      yaw,
      scale,
      phase,
      speed: 0.5 + index * 0.035
    }));

    this.projectsYardStats.forgeSparks += sparkCount;
    this.projectsYardStats.buildCards += cardSpecs.length;
    this.projectsYardStats.assemblyRings += 1;
    this.animated.push({ kind: 'projectsYardLife', sparkMesh, sparkEntries, cardMesh, cardEntries, ring });
    this.updateProjectsYardLife({ sparkMesh, sparkEntries, cardMesh, cardEntries, ring }, 0);
  }

  updateProjectsYardLife(life, elapsed) {
    if (life.sparkMesh?.visible) {
      for (const entry of life.sparkEntries) {
        const progress = (elapsed * entry.speed + entry.phase) % 1;
        const rise = progress * progress;
        this.lifeDummy.position.set(
          entry.baseX + entry.driftX * progress,
          0.76 + rise * 1.72 + Math.sin(elapsed * 7 + entry.index) * 0.04,
          entry.baseZ + entry.driftZ * progress
        );
        this.lifeDummy.rotation.set(elapsed * 1.8 + entry.index, elapsed * 2.1 + entry.phase, elapsed * 1.2);
        this.lifeDummy.scale.setScalar(0.95 * (1 - progress) + 0.08);
        this.lifeDummy.updateMatrix();
        life.sparkMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.sparkMesh.instanceMatrix.needsUpdate = true;
      life.sparkMesh.material.opacity = 0.62 + Math.sin(elapsed * 3.6) * 0.12;
      this.lifeStats.motionSamples += life.sparkEntries.length;
    }

    if (life.cardMesh?.visible) {
      for (const entry of life.cardEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, entry.baseY + Math.sin(phase) * 0.18, entry.z);
        this.lifeDummy.rotation.set(Math.sin(phase * 0.7) * 0.05, entry.yaw + Math.sin(phase * 0.8) * 0.14, Math.sin(phase * 1.1) * 0.08);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.4) * 0.035);
        this.lifeDummy.updateMatrix();
        life.cardMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.cardMesh.instanceMatrix.needsUpdate = true;
      life.cardMesh.material.opacity = 0.56 + Math.sin(elapsed * 1.25) * 0.08;
      this.lifeStats.motionSamples += life.cardEntries.length;
    }

    if (life.ring?.visible) {
      life.ring.rotation.z = elapsed * 0.74;
      life.ring.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.13);
      life.ring.material.opacity = 0.38 + Math.sin(elapsed * 1.6) * 0.1;
      this.lifeStats.motionSamples += 1;
    }
  }

  createBehindBuildLife(group, behind) {
    const packetGeometry = new THREE.BoxGeometry(0.34, 0.22, 0.34);
    const packetMaterial = new THREE.MeshBasicMaterial({
      color: 0x92ffea,
      transparent: true,
      opacity: 0.82,
      depthWrite: false
    });
    const packetCount = 10;
    const packetMesh = new THREE.InstancedMesh(packetGeometry, packetMaterial, packetCount);
    packetMesh.name = 'BehindBuildProcessPackets';
    packetMesh.frustumCulled = false;
    packetMesh.renderOrder = 43;
    group.add(packetMesh);

    const panelGeometry = new THREE.PlaneGeometry(1.16, 0.72);
    const panelMaterial = new THREE.MeshBasicMaterial({
      color: 0xa8a6ff,
      transparent: true,
      opacity: 0.66,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const panelSpecs = [
      [-4.8, -2.6, 1.35, -0.36, 0.86, 0.0],
      [-2.0, -3.8, 1.88, -0.18, 0.76, 0.7],
      [1.0, -3.2, 1.56, 0.08, 0.82, 1.4],
      [3.4, -1.6, 2.12, 0.26, 0.72, 2.1],
      [4.4, 1.2, 1.64, 0.42, 0.78, 2.8],
      [1.3, 3.0, 1.96, 0.1, 0.7, 3.5]
    ];
    const panelMesh = new THREE.InstancedMesh(panelGeometry, panelMaterial, panelSpecs.length);
    panelMesh.name = 'BehindBuildHologramPanels';
    panelMesh.frustumCulled = false;
    panelMesh.renderOrder = 44;
    group.add(panelMesh);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7cffb2,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.08, 1.18, 6), ringMaterial);
    ring.name = 'BehindBuildPrototypeRing';
    ring.position.set(behind.position[0] + 4.2, 2.45, behind.position[2] - 1.8);
    ring.rotation.y = 0.42;
    ring.renderOrder = 45;
    group.add(ring);

    const packetEntries = Array.from({ length: packetCount }, (_, index) => ({
      index,
      offset: index / packetCount,
      startX: behind.position[0] - 10.8,
      startZ: behind.position[2] + 6.4,
      endX: behind.position[0] + 8.4,
      endZ: behind.position[2] - 5.6,
      speed: 0.13 + (index % 3) * 0.012,
      phase: index * 0.47
    }));
    const panelEntries = panelSpecs.map(([dx, dz, y, yaw, scale, phase], index) => ({
      index,
      x: behind.position[0] + dx,
      z: behind.position[2] + dz,
      baseY: y,
      yaw,
      scale,
      phase,
      speed: 0.58 + index * 0.04
    }));

    this.behindBuildStats.processPackets += packetCount;
    this.behindBuildStats.hologramPanels += panelSpecs.length;
    this.behindBuildStats.prototypeRings += 1;
    this.animated.push({ kind: 'behindBuildLife', packetMesh, packetEntries, panelMesh, panelEntries, ring });
    this.updateBehindBuildLife({ packetMesh, packetEntries, panelMesh, panelEntries, ring }, 0);
  }

  updateBehindBuildLife(life, elapsed) {
    if (life.packetMesh?.visible) {
      for (const entry of life.packetEntries) {
        const progress = (elapsed * entry.speed + entry.offset) % 1;
        const flow = progress * progress * (3 - 2 * progress);
        const arc = Math.sin(progress * Math.PI);
        const x = THREE.MathUtils.lerp(entry.startX, entry.endX, flow);
        const z = THREE.MathUtils.lerp(entry.startZ, entry.endZ, flow);
        this.lifeDummy.position.set(x, 0.66 + arc * 0.62 + Math.sin(elapsed * 2.8 + entry.phase) * 0.05, z);
        this.lifeDummy.rotation.set(
          elapsed * 0.42 + entry.phase,
          Math.atan2(entry.endX - entry.startX, entry.endZ - entry.startZ),
          elapsed * 0.7 + entry.phase
        );
        this.lifeDummy.scale.setScalar(0.78 + arc * 0.34);
        this.lifeDummy.updateMatrix();
        life.packetMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.packetMesh.instanceMatrix.needsUpdate = true;
      life.packetMesh.material.opacity = 0.7 + Math.sin(elapsed * 1.4) * 0.08;
      this.lifeStats.motionSamples += life.packetEntries.length;
    }

    if (life.panelMesh?.visible) {
      for (const entry of life.panelEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, entry.baseY + Math.sin(phase) * 0.16, entry.z);
        this.lifeDummy.rotation.set(Math.sin(phase * 0.5) * 0.06, entry.yaw + Math.sin(phase * 0.8) * 0.16, Math.sin(phase * 1.2) * 0.1);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.3) * 0.03);
        this.lifeDummy.updateMatrix();
        life.panelMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.panelMesh.instanceMatrix.needsUpdate = true;
      life.panelMesh.material.opacity = 0.58 + Math.sin(elapsed * 1.2) * 0.07;
      this.lifeStats.motionSamples += life.panelEntries.length;
    }

    if (life.ring?.visible) {
      life.ring.rotation.z = elapsed * 0.62;
      life.ring.scale.setScalar(1 + Math.sin(elapsed * 1.65) * 0.12);
      life.ring.material.opacity = 0.4 + Math.sin(elapsed * 1.5) * 0.1;
      this.lifeStats.motionSamples += 1;
    }
  }

  addCompositionPad(group, x, z, width, depth, material, y, name) {
    this.groundRect(group, x, z, width, depth, material, y, name);
    this.districtCompositionStats.pads += 1;
  }

  addCompositionPathMark(group, x, z, width, depth, material, rotation, name) {
    this.box(group, x, 0.205, z, width, 0.035, depth, material, rotation, name);
    this.districtCompositionStats.pathMarks += 1;
  }

  addCareerConnectorMark(group, x, z, width, depth, material, rotation, name) {
    this.addCompositionPathMark(group, x, z, width, depth, material, rotation, name);
    this.districtCompositionStats.careerConnectors += 1;
  }

  addCompositionLamp(group, x, z, color, height, name) {
    this.addLamp(group, x, z, color, height, name);
    this.districtCompositionStats.lamps += 1;
  }

  addCompositionAsset(group, assetName, x, z, rotation, scale) {
    const placed = this.addPolishAsset(group, assetName, x, z, rotation, scale);
    if (placed) this.districtCompositionStats.authoredAssets += 1;
    return placed;
  }

  addCompositionDetailAsset(group, assetName, x, z, rotation, scale, statName) {
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (placed) this.districtCompositionStats[statName] = (this.districtCompositionStats[statName] || 0) + 1;
    return placed;
  }

  addRouteCompositionAsset(group, assetName, x, z, rotation, scale, statName) {
    const placed = this.addPolishAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.routeCompositionStats.authoredAssets += 1;
    this.routeCompositionStats[statName] = (this.routeCompositionStats[statName] || 0) + 1;
    return true;
  }

  addCoastalLoopAsset(group, assetName, x, z, rotation, scale, statName) {
    const placed = this.addRouteCompositionAsset(group, assetName, x, z, rotation, scale, statName);
    if (placed) this.routeCompositionStats.coastalLoopStaging += 1;
    return placed;
  }

  addRouteGuideTiles(group, run) {
    const forwardX = Math.sin(run.rotation);
    const forwardZ = Math.cos(run.rotation);
    const rightX = Math.cos(run.rotation);
    const rightZ = -Math.sin(run.rotation);
    const count = run.count || 5;
    for (let index = 0; index < count; index += 1) {
      const offset = (index - (count - 1) / 2) * 1.55;
      const side = index % 2 === 0 ? -1 : 1;
      this.box(
        group,
        run.x + forwardX * offset + rightX * side * 2.4,
        0.214,
        run.z + forwardZ * offset + rightZ * side * 2.4,
        0.28,
        0.035,
        1.18,
        run.color,
        run.rotation,
        'RouteCompositionGuideTile'
      );
      this.routeCompositionStats.guideTiles += 1;
    }
  }

  addSilhouetteAnchor(group, assetName, x, z, rotation, scale) {
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (placed) this.districtCompositionStats.silhouetteAnchors += 1;
    return placed;
  }

  addYardEdgeDetails(group, centerX, centerZ, width, depth, rotation = 0) {
    const segmentSpacing = 6.2;
    const edgeZ = depth / 2 + 0.24;
    const edgeX = width / 2 + 0.24;
    const longCount = Math.max(2, Math.floor(width / segmentSpacing));
    const shortCount = Math.max(2, Math.floor(depth / segmentSpacing));
    const place = (localX, localZ, localRotation) => {
      const x = centerX + Math.cos(rotation) * localX + Math.sin(rotation) * localZ;
      const z = centerZ - Math.sin(rotation) * localX + Math.cos(rotation) * localZ;
      this.addCompositionDetailAsset(group, 'EnvPolishYardEdgeTrim', x, z, rotation + localRotation, 0.78, 'edgeTrims');
    };
    for (let i = 0; i < longCount; i += 1) {
      const offset = -((longCount - 1) * segmentSpacing) / 2 + i * segmentSpacing;
      place(offset, -edgeZ, 0);
      place(offset, edgeZ, Math.PI);
    }
    for (let i = 0; i < shortCount; i += 1) {
      const offset = -((shortCount - 1) * segmentSpacing) / 2 + i * segmentSpacing;
      place(-edgeX, offset, Math.PI * 0.5);
      place(edgeX, offset, -Math.PI * 0.5);
    }
  }

  addCompositionPlanter(group, x, z, color) {
    this.addPlanterCluster(group, x, z, color);
    this.districtCompositionStats.planters += 1;
  }

  createSkillsTerminalComposition(group, skills) {
    const x = skills.position[0];
    const z = skills.position[2];
    const rotation = -0.62;
    this.addCompositionPad(group, x + 9.8, z + 2.8, 15.5, 10.2, this.world.materials.securityRoad, 0.121, 'SkillsSignalDeck');
    this.addCompositionPad(group, x + 2.4, z + 8.4, 16.8, 4.8, this.world.materials.paleStone, 0.124, 'SkillsSignalWalk');
    this.addYardEdgeDetails(group, x + 9.8, z + 2.8, 15.5, 10.2);
    for (const [assetName, dx, dz, assetRotation, scale] of [
      ['EnvPolishTerminalBank', 12.6, 3.8, -0.74, 0.66],
      ['EnvPolishTerminalCanopy', 7.1, -0.8, -0.62, 0.58],
      ['EnvPolishSignalSpire', 16.6, 7.1, -0.62, 0.62],
      ['EnvPolishGardenArch', 4.4, 9.4, -0.58, 0.64],
      ['EnvPolishRouteLantern', 15.6, -3.6, -0.54, 0.62],
      ['EnvPolishTerminalPillar', -12.8, 4.4, -0.4, 0.68]
    ]) {
      if (this.addCompositionAsset(group, assetName, x + dx, z + dz, assetRotation, scale)) {
        this.districtCompositionStats.skillsTerminalNodes += 1;
      }
    }
    for (const [dx, dz, color] of [
      [-13.8, 7.0, 0x92ffea],
      [2.6, 9.8, 0xb6a0ff],
      [17.8, 0.4, 0x68d8ff]
    ]) {
      this.addCompositionPlanter(group, x + dx, z + dz, color);
      this.districtCompositionStats.skillsTerminalNodes += 1;
    }
    for (let i = 0; i < 8; i += 1) {
      this.addCompositionPathMark(
        group,
        x - 10.8 + i * 3.4,
        z + 8.8 - i * 1.58,
        1.25,
        0.12,
        i % 3 === 0 ? this.world.materials.glowBlue : i % 3 === 1 ? this.world.materials.glowPink : this.world.materials.paleStone,
        rotation,
        'SkillsSignalGuideMark'
      );
      this.districtCompositionStats.skillsTerminalNodes += 1;
    }
  }

  createSkillsTerminalLife(group, skills) {
    const nodeGeometry = new THREE.OctahedronGeometry(0.28, 0);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.78,
      depthWrite: false
    });
    const nodeCount = 12;
    const nodeMesh = new THREE.InstancedMesh(nodeGeometry, nodeMaterial, nodeCount);
    nodeMesh.name = 'SkillsTerminalSignalNodes';
    nodeMesh.frustumCulled = false;
    nodeMesh.renderOrder = 43;
    group.add(nodeMesh);

    const cardGeometry = new THREE.PlaneGeometry(1.05, 0.58);
    const cardMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const cardSpecs = [
      [-8.2, -4.6, 2.08, -0.48, 0.92, 0.0, 0x92ffea],
      [-5.5, -2.7, 2.46, -0.54, 0.84, 0.5, 0xb6a0ff],
      [-2.2, -0.9, 2.18, -0.62, 0.9, 1.0, 0x68d8ff],
      [1.0, 0.9, 2.64, -0.66, 0.8, 1.5, 0xe6f3ff],
      [4.2, 2.8, 2.28, -0.58, 0.86, 2.0, 0x92ffea],
      [7.3, 4.6, 2.72, -0.72, 0.78, 2.5, 0xb6a0ff],
      [10.4, 6.2, 2.18, -0.62, 0.84, 3.0, 0x68d8ff],
      [13.4, 7.8, 2.48, -0.56, 0.76, 3.5, 0xe6f3ff]
    ];
    const cardMesh = new THREE.InstancedMesh(cardGeometry, cardMaterial, cardSpecs.length);
    cardMesh.name = 'SkillsTerminalCodeCards';
    cardMesh.frustumCulled = false;
    cardMesh.renderOrder = 44;
    group.add(cardMesh);

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x92ffea,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.22, 6), ringMaterial);
    ring.name = 'SkillsTerminalSyncRing';
    ring.position.set(skills.position[0] - 0.5, 2.85, skills.position[2] - 1.4);
    ring.rotation.y = -0.62;
    ring.renderOrder = 45;
    group.add(ring);

    const ribbonGeometry = new THREE.BoxGeometry(1, 1, 1);
    const ribbonMaterial = new THREE.MeshBasicMaterial({
      color: 0x92ffea,
      transparent: true,
      opacity: 0.48,
      depthWrite: false
    });
    const ribbonSpecs = [
      [-8.1, -3.9, 4.8, -0.62, 0.0],
      [-3.0, -1.2, 5.4, -0.62, 0.7],
      [2.6, 1.5, 5.2, -0.62, 1.4],
      [8.2, 4.0, 4.6, -0.62, 2.1]
    ];
    const ribbonMesh = new THREE.InstancedMesh(ribbonGeometry, ribbonMaterial, ribbonSpecs.length);
    ribbonMesh.name = 'SkillsTerminalSignalRibbons';
    ribbonMesh.frustumCulled = false;
    ribbonMesh.renderOrder = 42;
    group.add(ribbonMesh);

    const nodeColors = [0x92ffea, 0xb6a0ff, 0x68d8ff, 0xe6f3ff];
    const nodeEntries = Array.from({ length: nodeCount }, (_, index) => {
      const angle = index * 2.399;
      const radius = 2.6 + (index % 4) * 0.34;
      nodeMesh.setColorAt(index, new THREE.Color(nodeColors[index % nodeColors.length]));
      return {
        index,
        centerX: skills.position[0] - 0.5,
        centerZ: skills.position[2] - 1.4,
        angle,
        radius,
        baseY: 1.62 + (index % 3) * 0.24,
        phase: index * 0.37,
        speed: 0.42 + (index % 5) * 0.025,
        scale: 1.06 + (index % 4) * 0.07
      };
    });
    const cardEntries = cardSpecs.map(([dx, dz, y, yaw, scale, phase, color], index) => {
      cardMesh.setColorAt(index, new THREE.Color(color));
      return {
        index,
        x: skills.position[0] + dx,
        z: skills.position[2] + dz,
        baseY: y,
        yaw,
        scale,
        phase,
        speed: 0.48 + index * 0.035
      };
    });
    const ribbonEntries = ribbonSpecs.map(([dx, dz, length, yaw, phase], index) => ({
      index,
      x: skills.position[0] + dx,
      z: skills.position[2] + dz,
      length,
      yaw,
      phase,
      speed: 0.64 + index * 0.04
    }));

    if (nodeMesh.instanceColor) nodeMesh.instanceColor.needsUpdate = true;
    if (cardMesh.instanceColor) cardMesh.instanceColor.needsUpdate = true;
    this.skillsTerminalStats.signalNodes += nodeCount;
    this.skillsTerminalStats.codeCards += cardSpecs.length;
    this.skillsTerminalStats.syncRings += 1;
    this.skillsTerminalStats.signalRibbons += ribbonSpecs.length;
    this.animated.push({ kind: 'skillsTerminalLife', nodeMesh, nodeEntries, cardMesh, cardEntries, ring, ribbonMesh, ribbonEntries });
    this.updateSkillsTerminalLife({ nodeMesh, nodeEntries, cardMesh, cardEntries, ring, ribbonMesh, ribbonEntries }, 0);
  }

  updateSkillsTerminalLife(life, elapsed) {
    if (life.nodeMesh?.visible) {
      for (const entry of life.nodeEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        const angle = entry.angle + Math.sin(phase * 0.72) * 0.24;
        this.lifeDummy.position.set(
          entry.centerX + Math.cos(angle) * entry.radius,
          entry.baseY + Math.sin(phase * 1.4) * 0.22,
          entry.centerZ + Math.sin(angle) * entry.radius
        );
        this.lifeDummy.rotation.set(elapsed * 0.7 + entry.phase, elapsed * 1.1 + entry.index, elapsed * 0.5);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.8) * 0.08);
        this.lifeDummy.updateMatrix();
        life.nodeMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.nodeMesh.instanceMatrix.needsUpdate = true;
      life.nodeMesh.material.opacity = 0.66 + Math.sin(elapsed * 1.6) * 0.09;
      this.lifeStats.motionSamples += life.nodeEntries.length;
    }

    if (life.cardMesh?.visible) {
      for (const entry of life.cardEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, entry.baseY + Math.sin(phase) * 0.16, entry.z);
        this.lifeDummy.rotation.set(Math.sin(phase * 0.62) * 0.05, entry.yaw + Math.sin(phase * 0.9) * 0.12, Math.sin(phase * 1.15) * 0.08);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.35) * 0.03);
        this.lifeDummy.updateMatrix();
        life.cardMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.cardMesh.instanceMatrix.needsUpdate = true;
      life.cardMesh.material.opacity = 0.5 + Math.sin(elapsed * 1.2) * 0.07;
      this.lifeStats.motionSamples += life.cardEntries.length;
    }

    if (life.ring?.visible) {
      life.ring.rotation.z = elapsed * 0.68;
      life.ring.scale.setScalar(1 + Math.sin(elapsed * 1.7) * 0.12);
      life.ring.material.opacity = 0.36 + Math.sin(elapsed * 1.5) * 0.09;
      this.lifeStats.motionSamples += 1;
    }

    if (life.ribbonMesh?.visible) {
      for (const entry of life.ribbonEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, 0.62 + Math.sin(phase) * 0.035, entry.z);
        this.lifeDummy.rotation.set(0, entry.yaw, 0);
        this.lifeDummy.scale.set(entry.length * (0.9 + Math.sin(phase * 1.3) * 0.04), 0.045, 0.13);
        this.lifeDummy.updateMatrix();
        life.ribbonMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.ribbonMesh.instanceMatrix.needsUpdate = true;
      life.ribbonMesh.material.opacity = 0.4 + Math.sin(elapsed * 1.55) * 0.08;
      this.lifeStats.motionSamples += life.ribbonEntries.length;
    }
  }

  createAwardsArchiveComposition(group, awards) {
    const x = awards.position[0];
    const z = awards.position[2];
    const rotation = -0.2;
    this.addCompositionPad(group, x - 1.6, z + 1.8, 20.5, 13.2, this.world.materials.paleStone, 0.123, 'AwardsArchiveCourt');
    this.addCompositionPad(group, x - 7.9, z + 3.8, 5.8, 11.4, this.world.materials.warmStone, 0.127, 'AwardsGalleryWalk');
    this.addYardEdgeDetails(group, x - 1.6, z + 1.8, 20.5, 13.2);
    for (const [assetName, dx, dz, assetRotation, scale] of [
      ['EnvPolishArchiveStepCluster', -7.6, -1.4, -0.12, 0.7],
      ['EnvPolishArchiveStepCluster', 5.8, -2.2, 0.18, 0.64],
      ['EnvPolishGardenArch', -9.2, 7.2, -0.18, 0.62],
      ['EnvPolishRouteLantern', -11.6, 0.4, -0.3, 0.62],
      ['EnvPolishRouteLantern', 8.4, 6.2, -0.1, 0.58],
      ['EnvPolishBenchPlanter', 9.4, -2.8, -0.28, 0.68]
    ]) {
      if (this.addCompositionAsset(group, assetName, x + dx, z + dz, assetRotation, scale)) {
        this.districtCompositionStats.awardsArchiveNodes += 1;
      }
    }
    for (const [dx, dz, angle, scale, accent] of [
      [-7.8, 2.2, -0.2, 0.82, this.world.materials.gold],
      [-4.4, 4.4, -0.12, 0.74, this.world.materials.warmGlow],
      [-1.0, -1.8, 0.08, 0.86, this.world.materials.gold],
      [2.8, 4.0, 0.12, 0.72, this.world.materials.glowBlue],
      [6.0, 1.2, -0.24, 0.78, this.world.materials.gold],
      [1.6, 7.0, -0.18, 0.68, this.world.materials.glowPink]
    ]) {
      this.addAwardDisplayPlinth(group, x + dx, z + dz, angle, scale, accent);
    }
    for (let i = 0; i < 8; i += 1) {
      this.addCompositionPathMark(
        group,
        x - 9.4 + i * 2.65,
        z + 5.8 - Math.sin(i * 0.72) * 1.05,
        1.14,
        0.12,
        i % 2 ? this.world.materials.warmGlow : this.world.materials.paleStone,
        rotation + Math.sin(i * 0.5) * 0.18,
        'AwardsArchiveGuideMark'
      );
      this.districtCompositionStats.awardsArchiveNodes += 1;
    }
    for (const [dx, dz, color] of [
      [-11.2, -2.4, 0xffdf8a],
      [8.8, 7.6, 0xffc36a]
    ]) {
      this.addCompositionPlanter(group, x + dx, z + dz, color);
      this.districtCompositionStats.awardsArchiveNodes += 1;
    }
  }

  addAwardDisplayPlinth(group, x, z, rotation, scale, accentMaterial) {
    this.box(group, x, 0.28, z, 2.2 * scale, 0.32, 1.28 * scale, this.world.materials.warmStone, rotation, 'AwardsDisplayBase');
    this.box(group, x, 0.68, z, 1.38 * scale, 0.5, 0.76 * scale, this.world.materials.paleStone, rotation, 'AwardsDisplayStone');
    this.box(group, x, 1.02, z - 0.42 * scale, 0.9 * scale, 0.08, 0.07, accentMaterial, rotation, 'AwardsDisplayPlaque');
    this.cylinder(group, x, 1.28, z + 0.06 * scale, 0.22 * scale, 0.42 * scale, this.world.materials.gold, 8, 'AwardsDisplayTrophyStem');
    this.box(group, x, 1.58, z + 0.06 * scale, 0.5 * scale, 0.36 * scale, 0.5 * scale, accentMaterial, rotation, 'AwardsDisplayTrophy');
    this.districtCompositionStats.awardsArchiveNodes += 1;
  }

  createTodoBuildYardComposition(group, todo) {
    const rotation = 0.34;
    this.addTodoYardPad(group, todo, 6.2, -5.4, 11.6, 5.8, this.world.materials.warmStone, rotation - 0.06, 'TodoSprintDeck');
    this.addTodoYardPad(group, todo, -10.6, -2.0, 4.8, 10.8, this.world.materials.securityRoad, rotation + 0.03, 'TodoReviewLane');

    for (const [assetName, right, forward, assetRotation, scale] of [
      ['EnvPolishTerminalBank', 7.8, -5.2, rotation - 0.16, 0.56],
      ['EnvPolishBuildCrateStack', 4.6, -7.8, rotation + 0.12, 0.58],
      ['EnvPolishTodoCardStack', -6.6, -4.8, rotation + 0.06, 0.62],
      ['EnvPolishRouteLantern', 11.2, -2.0, rotation - 0.22, 0.58]
    ]) {
      this.addTodoYardAsset(group, assetName, todo, right, forward, assetRotation, scale);
    }

    for (let i = 0; i < 8; i += 1) {
      const [markX, markZ] = this.todoPoint(todo, -10.2 + i * 2.1, -4.8 + Math.sin(i * 0.68) * 0.5, rotation);
      this.addTodoYardPathMark(group, markX, markZ, 1.06, 0.12, rotation + 0.08, i % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue, 'TodoBuildQueueGuideMark');
    }

    for (let i = 0; i < 6; i += 1) {
      const forward = -6.6 + i * 2.15;
      const [leftX, leftZ] = this.todoPoint(todo, -12.7, forward, rotation);
      const [rightX, rightZ] = this.todoPoint(todo, -8.5, forward, rotation);
      this.addTodoQueueRail(group, leftX, leftZ, 0.12, 1.34, rotation, i % 2 ? this.world.materials.paleStone : this.world.materials.glowPink, 'TodoQueueLeftRail');
      this.addTodoQueueRail(group, rightX, rightZ, 0.12, 1.34, rotation, i % 2 ? this.world.materials.glowBlue : this.world.materials.paleStone, 'TodoQueueRightRail');
    }

    for (const [right, forward, material, colorIndex] of [
      [-1.6, -5.6, this.world.materials.glowPink, 0],
      [0.8, -4.8, this.world.materials.glowBlue, 1],
      [3.2, -4.0, this.world.materials.warmGlow, 2],
      [5.6, -3.0, this.world.materials.glowPink, 3],
      [8.0, -2.1, this.world.materials.glowBlue, 4],
      [10.2, -1.0, this.world.materials.paleStone, 5]
    ]) {
      const [cardX, cardZ] = this.todoPoint(todo, right, forward, rotation);
      this.addTodoTaskCard(group, cardX, cardZ, rotation + (colorIndex % 2 ? -0.05 : 0.05), material, 'TodoQueueTaskCard');
    }

    for (const [right, forward, color] of [
      [-12.9, 5.6, 0xb6a0ff],
      [12.4, -5.8, 0x68d8ff],
      [4.2, 4.8, 0xffc36a]
    ]) {
      const [lampX, lampZ] = this.todoPoint(todo, right, forward, rotation);
      this.addTodoYardLamp(group, lampX, lampZ, color, 2.45, 'TodoBuildYardLamp');
    }
  }

  createTodoBuildYardLife(group, todo) {
    const rotation = 0.34;
    const pipGeometry = new THREE.OctahedronGeometry(0.22, 0);
    const pipMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.76,
      depthWrite: false
    });
    const pipCount = 12;
    const pipMesh = new THREE.InstancedMesh(pipGeometry, pipMaterial, pipCount);
    pipMesh.name = 'TodoYardQueuePips';
    pipMesh.frustumCulled = false;
    pipMesh.renderOrder = 43;
    group.add(pipMesh);

    const taskGeometry = new THREE.BoxGeometry(0.88, 0.52, 0.045);
    const taskMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      vertexColors: true,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    const taskSpecs = [
      [-8.8, -5.8, 1.38, 0.44, 0.82, 0.0, 0xb6a0ff],
      [-6.8, -4.7, 1.72, 0.38, 0.74, 0.44, 0x68d8ff],
      [-4.6, -3.6, 1.48, 0.34, 0.78, 0.88, 0xffc36a],
      [-2.2, -2.6, 1.92, 0.28, 0.7, 1.32, 0xe6f3ff],
      [0.8, -1.4, 1.62, 0.3, 0.76, 1.76, 0xb6a0ff],
      [3.8, -0.3, 2.04, 0.36, 0.68, 2.2, 0x68d8ff],
      [6.6, 0.7, 1.58, 0.3, 0.72, 2.64, 0xffc36a],
      [9.6, 1.7, 1.86, 0.24, 0.66, 3.08, 0xe6f3ff]
    ];
    const taskMesh = new THREE.InstancedMesh(taskGeometry, taskMaterial, taskSpecs.length);
    taskMesh.name = 'TodoYardFloatingTasks';
    taskMesh.frustumCulled = false;
    taskMesh.renderOrder = 44;
    group.add(taskMesh);

    const [ringX, ringZ] = this.todoPoint(todo, 0.6, 1.0, rotation);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xb6a0ff,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.1, 1.22, 6), ringMaterial);
    ring.name = 'TodoYardReviewRing';
    ring.position.set(ringX, 2.1, ringZ);
    ring.rotation.y = rotation;
    ring.renderOrder = 45;
    group.add(ring);

    const pipColors = [0xb6a0ff, 0x68d8ff, 0xffc36a, 0xe6f3ff];
    const pipEntries = Array.from({ length: pipCount }, (_, index) => {
      const lane = index % 2 === 0 ? -11.7 : -8.9;
      const forward = -6.6 + Math.floor(index / 2) * 2.05;
      const [x, z] = this.todoPoint(todo, lane, forward, rotation);
      pipMesh.setColorAt(index, new THREE.Color(pipColors[index % pipColors.length]));
      return {
        index,
        x,
        z,
        baseY: 0.76 + (index % 3) * 0.04,
        phase: index * 0.42,
        speed: 0.76 + (index % 4) * 0.04,
        scale: 0.86 + (index % 3) * 0.06
      };
    });
    const taskEntries = taskSpecs.map(([right, forward, y, yaw, scale, phase, color], index) => {
      const [x, z] = this.todoPoint(todo, right, forward, rotation);
      taskMesh.setColorAt(index, new THREE.Color(color));
      return {
        index,
        x,
        z,
        baseY: y,
        yaw,
        scale,
        phase,
        speed: 0.52 + index * 0.035
      };
    });

    if (pipMesh.instanceColor) pipMesh.instanceColor.needsUpdate = true;
    if (taskMesh.instanceColor) taskMesh.instanceColor.needsUpdate = true;
    this.todoYardStats.queuePips += pipCount;
    this.todoYardStats.floatingTasks += taskSpecs.length;
    this.todoYardStats.reviewRings += 1;
    this.animated.push({ kind: 'todoYardLife', pipMesh, pipEntries, taskMesh, taskEntries, ring });
    this.updateTodoYardLife({ pipMesh, pipEntries, taskMesh, taskEntries, ring }, 0);
  }

  updateTodoYardLife(life, elapsed) {
    if (life.pipMesh?.visible) {
      for (const entry of life.pipEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, entry.baseY + Math.sin(phase * 1.4) * 0.12, entry.z);
        this.lifeDummy.rotation.set(elapsed * 0.8 + entry.phase, elapsed * 1.25 + entry.index, elapsed * 0.55);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.6) * 0.08);
        this.lifeDummy.updateMatrix();
        life.pipMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.pipMesh.instanceMatrix.needsUpdate = true;
      life.pipMesh.material.opacity = 0.66 + Math.sin(elapsed * 1.7) * 0.08;
      this.lifeStats.motionSamples += life.pipEntries.length;
    }

    if (life.taskMesh?.visible) {
      for (const entry of life.taskEntries) {
        const phase = elapsed * entry.speed + entry.phase;
        this.lifeDummy.position.set(entry.x, entry.baseY + Math.sin(phase) * 0.17, entry.z);
        this.lifeDummy.rotation.set(Math.sin(phase * 0.64) * 0.05, entry.yaw + Math.sin(phase * 0.86) * 0.12, Math.sin(phase * 1.1) * 0.08);
        this.lifeDummy.scale.setScalar(entry.scale + Math.sin(phase * 1.32) * 0.03);
        this.lifeDummy.updateMatrix();
        life.taskMesh.setMatrixAt(entry.index, this.lifeDummy.matrix);
      }
      life.taskMesh.instanceMatrix.needsUpdate = true;
      life.taskMesh.material.opacity = 0.56 + Math.sin(elapsed * 1.15) * 0.08;
      this.lifeStats.motionSamples += life.taskEntries.length;
    }

    if (life.ring?.visible) {
      life.ring.rotation.z = elapsed * 0.72;
      life.ring.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.12);
      life.ring.material.opacity = 0.34 + Math.sin(elapsed * 1.45) * 0.1;
      this.lifeStats.motionSamples += 1;
    }
  }

  todoPoint(todo, right, forward, rotation) {
    const x = todo.position[0] + Math.cos(rotation) * right + Math.sin(rotation) * forward;
    const z = todo.position[2] - Math.sin(rotation) * right + Math.cos(rotation) * forward;
    return [x, z];
  }

  addTodoYardPad(group, todo, right, forward, width, depth, material, rotation, name) {
    const [x, z] = this.todoPoint(todo, right, forward, rotation);
    this.groundPatch(group, x, z, width, depth, material, 0.123, rotation, name, 941 + this.todoYardStats.pads);
    this.districtCompositionStats.pads += 1;
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.pads += 1;
  }

  addTodoYardAsset(group, assetName, todo, right, forward, rotation, scale) {
    const [x, z] = this.todoPoint(todo, right, forward, 0.34);
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.authoredAssets += 1;
    return true;
  }

  addTodoYardPathMark(group, x, z, width, depth, rotation, material, name) {
    this.addCompositionPathMark(group, x, z, width, depth, material, rotation, name);
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.pathMarks += 1;
  }

  addTodoQueueRail(group, x, z, width, depth, rotation, material, name) {
    this.box(group, x, 0.31, z, width, 0.13, depth, material, rotation, name);
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.queueRails += 1;
  }

  addTodoTaskCard(group, x, z, rotation, accentMaterial, name) {
    this.box(group, x, 0.4, z, 1.3, 0.18, 0.78, this.world.materials.darkWood, rotation, name);
    this.box(group, x, 0.56, z - 0.18, 1.06, 0.08, 0.09, accentMaterial, rotation, `${name}Status`);
    this.box(group, x, 0.7, z + 0.12, 0.82, 0.08, 0.08, this.world.materials.paleStone, rotation, `${name}Label`);
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.taskCards += 1;
  }

  addTodoYardLamp(group, x, z, color, height, name) {
    this.addCompositionLamp(group, x, z, color, height, name);
    this.districtCompositionStats.todoYardNodes += 1;
    this.todoYardStats.lamps += 1;
  }

  createCareerOfficeComposition(group, career) {
    const rotation = -0.34;
    this.addCareerOfficePad(group, career, -5.6, -8.6, 15.2, 6.4, this.world.materials.plazaRoad, rotation + 0.04, 'CareerArrivalApron');
    this.addCareerOfficePad(group, career, 12.4, 2.8, 10.5, 8.4, this.world.materials.warmStone, rotation - 0.08, 'CareerSignalAnnex');

    for (const [assetName, right, forward, assetRotation, scale, statName] of [
      ['EnvPolishTerminalCanopy', -4.8, -7.8, rotation + 0.02, 0.58, 'signalFrames'],
      ['EnvPolishHarborAntenna', 13.4, 3.8, rotation - 0.14, 0.7, 'signalFrames'],
      ['EnvPolishRouteLantern', 14.2, -3.8, rotation - 0.24, 0.62, null],
      ['EnvPolishRouteLantern', -13.6, -8.2, rotation + 0.14, 0.62, null],
      ['EnvPolishSignalTotem', 5.2, -10.6, rotation + 0.1, 0.68, 'signalFrames']
    ]) {
      this.addCareerOfficeAsset(group, assetName, career, right, forward, assetRotation, scale, statName);
    }

    for (let i = 0; i < 8; i += 1) {
      const [markX, markZ] = this.careerPoint(career, -8.6 + i * 2.8, -7.0 + Math.sin(i * 0.72) * 0.75, rotation);
      this.addCareerOfficePathMark(group, markX, markZ, 1.25, 0.12, rotation + Math.sin(i * 0.4) * 0.08, i % 2 ? this.world.materials.glowPink : this.world.materials.glowBlue, 'CareerArrivalGuideMark');
    }

    for (const [right, forward, color] of [
      [-12.8, -4.2, 0xb6a0ff],
      [12.6, -2.2, 0x68d8ff],
      [7.8, 8.8, 0xffc36a]
    ]) {
      const [lampX, lampZ] = this.careerPoint(career, right, forward, rotation);
      this.addCareerOfficeLamp(group, lampX, lampZ, color, 2.55, 'CareerOfficeSignalLamp');
    }

    this.addCareerFacadeDetail(group, career, 0.7, -1.8, 3.8, 0.1, this.world.materials.glowBlue, rotation, 2.46, 'CareerFacadeTopSignal');
    this.addCareerFacadeDetail(group, career, -0.9, -1.98, 1.2, 0.09, this.world.materials.glowPink, rotation, 1.72, 'CareerFacadeLeftSignal');
    this.addCareerFacadeDetail(group, career, 1.0, -2.02, 1.35, 0.09, this.world.materials.warmGlow, rotation, 1.28, 'CareerFacadeRightSignal');
    this.addCareerFacadeDetail(group, career, -2.3, -0.6, 0.18, 1.7, this.world.materials.cable, rotation, 1.34, 'CareerFacadeSideMullionA');
    this.addCareerFacadeDetail(group, career, 2.3, -0.6, 0.18, 1.7, this.world.materials.cable, rotation, 1.34, 'CareerFacadeSideMullionB');
    this.addCareerFacadeDetail(group, career, 0.6, 2.22, 3.4, 0.12, this.world.materials.wood, rotation, 2.76, 'CareerRoofWarmLip');
  }

  careerPoint(career, right, forward, rotation) {
    const x = career.position[0] + Math.cos(rotation) * right + Math.sin(rotation) * forward;
    const z = career.position[2] - Math.sin(rotation) * right + Math.cos(rotation) * forward;
    return [x, z];
  }

  addCareerOfficePad(group, career, right, forward, width, depth, material, rotation, name) {
    const [x, z] = this.careerPoint(career, right, forward, rotation);
    this.groundPatch(group, x, z, width, depth, material, 0.123, rotation, name, 871 + this.careerOfficeStats.pads);
    this.districtCompositionStats.pads += 1;
    this.districtCompositionStats.careerOfficeNodes += 1;
    this.careerOfficeStats.pads += 1;
  }

  addCareerOfficeAsset(group, assetName, career, right, forward, rotation, scale, statName) {
    const [x, z] = this.careerPoint(career, right, forward, -0.34);
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.districtCompositionStats.careerOfficeNodes += 1;
    this.careerOfficeStats.authoredAssets += 1;
    if (statName) this.careerOfficeStats[statName] = (this.careerOfficeStats[statName] || 0) + 1;
    return true;
  }

  addCareerOfficePathMark(group, x, z, width, depth, rotation, material, name) {
    this.addCompositionPathMark(group, x, z, width, depth, material, rotation, name);
    this.districtCompositionStats.careerOfficeNodes += 1;
    this.careerOfficeStats.pathMarks += 1;
  }

  addCareerOfficeLamp(group, x, z, color, height, name) {
    this.addCompositionLamp(group, x, z, color, height, name);
    this.districtCompositionStats.careerOfficeNodes += 1;
    this.careerOfficeStats.lamps += 1;
  }

  addCareerFacadeDetail(group, career, right, forward, width, depth, material, rotation, height, name) {
    const [x, z] = this.careerPoint({ position: [career.position[0] + 1.2, 0, career.position[2] + 0.8] }, right, forward, rotation);
    this.box(group, x, height, z, width, 0.08, depth, material, rotation, name);
    this.districtCompositionStats.careerOfficeNodes += 1;
    this.careerOfficeStats.facadePanels += 1;
  }

  createFarmFieldComposition(group, farm) {
    const x = farm.position[0];
    const z = farm.position[2];
    const rotation = -0.16;
    this.addCompositionPad(group, x - 2.4, z + 0.4, 30, 18, this.world.materials.warmStone, 0.119, 'FarmFieldTerrace');
    this.addCompositionPad(group, x + 10.8, z + 2.2, 7.5, 13, this.world.materials.sand, 0.122, 'FarmIrrigationWalk');
    for (let i = 0; i < 8; i += 1) {
      const rowX = x - 13.0 + i * 3.05;
      const rowZ = z - 1.4 + Math.sin(i * 0.8) * 0.35;
      this.box(group, rowX, 0.21, rowZ, 1.05, 0.08, 13.4, this.world.materials.crop, rotation, 'FarmCropRow');
      this.box(group, rowX, 0.185, rowZ + 0.24, 1.28, 0.04, 12.8, this.world.materials.dirtRoad, rotation, 'FarmSoilRow');
      this.districtCompositionStats.farmRows += 1;
    }
    for (let i = 0; i < 6; i += 1) {
      const railX = x - 16.0 + i * 5.4;
      this.addFarmFenceSegment(group, railX, z - 9.6, rotation, 'FarmFenceBack');
      this.addFarmFenceSegment(group, railX, z + 9.8, rotation, 'FarmFenceFront');
    }
    this.addCompositionAsset(group, 'EnvPolishFarmIrrigator', x + 11.8, z + 5.6, 0.05, 0.74);
    this.addCompositionAsset(group, 'EnvPolishRouteLantern', x - 15.8, z - 8.2, -0.44, 0.62);
    this.addCompositionAsset(group, 'EnvPolishBenchPlanter', x + 12.8, z - 5.8, 0.18, 0.68);
    for (const [dx, dz, color] of [
      [-16.4, -8.6, 0xc79b56],
      [14.8, 8.4, 0x7cffb2],
      [2.2, 10.6, 0xffc36a]
    ]) {
      this.addCompositionLamp(group, x + dx, z + dz, color, 2.35, 'FarmFieldLamp');
    }
    for (let i = 0; i < 6; i += 1) {
      this.addCompositionPathMark(
        group,
        x - 11.0 + i * 4.2,
        z + 11.6 + Math.sin(i) * 0.35,
        1.4,
        0.14,
        i % 2 ? this.world.materials.paleStone : this.world.materials.glow,
        rotation,
        'FarmTrackGuideMark'
      );
    }
  }

  addFarmFenceSegment(group, x, z, rotation, name) {
    this.box(group, x - 1.7, 0.72, z, 0.16, 1.08, 0.16, this.world.materials.darkWood, rotation, `${name}PostA`);
    this.box(group, x + 1.7, 0.72, z, 0.16, 1.08, 0.16, this.world.materials.darkWood, rotation, `${name}PostB`);
    this.box(group, x, 1.02, z, 3.7, 0.12, 0.12, this.world.materials.wood, rotation, `${name}RailTop`);
    this.box(group, x, 0.58, z, 3.5, 0.1, 0.1, this.world.materials.wood, rotation, `${name}RailLow`);
    this.districtCompositionStats.farmFences += 1;
  }

  createHarborComposition(group, contact) {
    const x = contact.position[0];
    const z = contact.position[2];
    const rotation = contact.rotation || -0.34;
    this.addHarborPad(group, x + 1.2, z + 4.8, 22, 14, this.world.materials.paleStone, rotation, 'HarborSignalDeck');
    this.addHarborPad(group, x + 8.8, z + 13.2, 8.8, 7.2, this.world.materials.sand, rotation - 0.18, 'HarborPierApron');

    this.addSign(group, 'CONTACT', 'Harbor Signal', ...this.harborPoint(contact, -10.4, 14.3, rotation), rotation - 0.34, 0x78b7ff, 2.5, 'HarborSign');
    this.addHarborAsset(group, 'EnvPolishHarborSignal', contact, 1.6, 3.8, rotation + 0.02, 1.18, null);
    this.addHarborAsset(group, 'EnvPolishHarborPier', contact, 8.4, 16.6, rotation - 0.08, 1.1, 'piers');
    this.addHarborAsset(group, 'EnvPolishHarborPier', contact, 15.2, 10.2, rotation + 0.88, 0.78, 'piers');
    this.addHarborAsset(group, 'EnvPolishHarborAntenna', contact, -7.8, 2.6, rotation + 0.22, 0.92, null);
    this.addHarborAsset(group, 'EnvPolishHarborShade', contact, -8.8, 8.2, rotation + 0.18, 0.92, 'shadeStructures');
    this.addHarborAsset(group, 'EnvPolishDockFloat', contact, 14.8, 19.3, rotation - 0.12, 0.92, 'piers');
    this.addHarborAsset(group, 'EnvPolishWaveMarker', contact, 2.8, 18.4, rotation + 0.34, 0.86, null);
    this.addHarborAsset(group, 'EnvPolishShorelineTidePool', contact, -4.8, 18.8, rotation + 0.16, 1.06, null);
    this.addHarborAsset(group, 'EnvPolishShorelineTidePool', contact, 10.8, 19.4, rotation - 0.22, 0.92, null);
    this.addHarborAsset(group, 'EnvPolishShorelineBreakwater', contact, 5.8, 22.2, rotation + 0.05, 0.88, null);
    this.addHarborAsset(group, 'EnvPolishPalm', contact, -13.2, 5.8, rotation + 0.62, 1.08, null);
    this.addHarborAsset(group, 'EnvPolishPalm', contact, 13.4, 2.2, rotation + 0.16, 0.98, null);
    for (const [right, forward, assetRotation, scale] of [
      [-2.8, 10.6, rotation - 0.28, 0.76],
      [5.4, 6.2, rotation + 0.18, 0.72],
      [11.6, 3.6, rotation - 0.52, 0.68]
    ]) {
      this.addHarborAsset(group, 'EnvPolishHarborCargoStack', contact, right, forward, assetRotation, scale, 'cargoStacks');
    }
    for (const [right, forward, color] of [
      [-12.8, -2.2, 0x78b7ff],
      [-4.2, 13.8, 0x78b7ff],
      [5.8, -1.4, 0x9ccfff],
      [12.6, 8.8, 0x78b7ff]
    ]) {
      const [lampX, lampZ] = this.harborPoint(contact, right, forward, rotation);
      this.addHarborLamp(group, lampX, lampZ, color, 2.8, 'HarborLamp');
    }
    for (const [right, forward] of [
      [0, 1.2],
      [6.8, 12.6],
      [-8.8, 8.2]
    ]) {
      const [beaconX, beaconZ] = this.harborPoint(contact, right, forward, rotation);
      this.beacon(group, beaconX, beaconZ, 0x78b7ff);
      this.harborStats.beacons += 1;
    }
    this.createHarborSignalLife(group, contact, rotation);
    for (let i = 0; i < 9; i += 1) {
      const [markX, markZ] = this.harborPoint(contact, -7.6 + i * 2.0, -3.6 + Math.sin(i * 0.8) * 0.8, rotation);
      this.addHarborPathMark(group, markX, markZ, 1.2, 0.16, rotation + 0.08, i % 2 ? this.world.materials.glowBlue : this.world.materials.paleStone, 'HarborRoadGuideMark');
    }
    for (let i = 0; i < 7; i += 1) {
      const [markX, markZ] = this.harborPoint(contact, 4.8 + Math.sin(i * 0.7) * 1.2, 4.2 + i * 1.9, rotation);
      this.addHarborPathMark(group, markX, markZ, 0.28, 1.2, rotation - 0.14, this.world.materials.glowBlue, 'HarborPierGuideMark');
    }
    this.addYardEdgeDetails(group, x + 1.2, z + 4.8, 22, 14, rotation);
  }

  createHarborSignalLife(group, contact, rotation) {
    const [originX, originZ] = this.harborPoint(contact, 1.6, 3.8, rotation);
    const beamGeometry = new THREE.BoxGeometry(18, 0.035, 0.2);
    beamGeometry.translate(9, 0, 0);
    for (let i = 0; i < 3; i += 1) {
      const material = new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x9ccfff : 0x78b7ff,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const beam = new THREE.Mesh(beamGeometry, material);
      beam.name = 'HarborSignalSweepBeam';
      beam.position.set(originX, 4.18 + i * 0.12, originZ);
      beam.rotation.y = rotation + i * 0.72;
      beam.renderOrder = 40;
      group.add(beam);
      this.animated.push({
        kind: 'harborSignalBeam',
        mesh: beam,
        baseRotation: beam.rotation.y,
        range: 0.16 + i * 0.035,
        speed: 0.34 + i * 0.05,
        opacitySpeed: 0.7 + i * 0.08,
        phase: i * 0.9,
        baseOpacity: 0.18,
        opacityRange: 0.07
      });
      this.harborStats.signalBeams += 1;
    }

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x78b7ff,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.6, 3.05, 28), ringMaterial);
    ring.name = 'HarborSignalPulseRing';
    ring.position.set(originX, 4.3, originZ);
    ring.rotation.x = -Math.PI / 2;
    ring.renderOrder = 41;
    group.add(ring);
    this.animated.push({
      kind: 'pulse',
      mesh: ring,
      baseScale: 0.92,
      range: 0.14,
      speed: 1.2,
      phase: 0.4,
      rotationSpeed: 0.18,
      baseOpacity: 0.26,
      opacityRange: 0.08
    });
    this.harborStats.signalRings += 1;
  }

  harborPoint(contact, right, forward, rotation) {
    const x = contact.position[0] + Math.cos(rotation) * right + Math.sin(rotation) * forward;
    const z = contact.position[2] - Math.sin(rotation) * right + Math.cos(rotation) * forward;
    return [x, z];
  }

  addHarborPad(group, x, z, width, depth, material, rotation, name) {
    this.groundRect(group, x, z, width, depth, material, 0.124, name, rotation);
    this.districtCompositionStats.pads += 1;
    this.harborStats.pads += 1;
    this.harborStats.maxPadArea = Math.max(this.harborStats.maxPadArea, Number((width * depth).toFixed(1)));
  }

  addHarborPathMark(group, x, z, width, depth, rotation, material, name) {
    this.box(group, x, 0.212, z, width, 0.035, depth, material, rotation, name);
    this.districtCompositionStats.pathMarks += 1;
    this.harborStats.pathMarks += 1;
  }

  addHarborLamp(group, x, z, color, height, name) {
    this.addCompositionLamp(group, x, z, color, height, name);
    this.harborStats.lamps += 1;
  }

  addHarborAsset(group, assetName, contact, right, forward, rotation, scale, statName) {
    const [x, z] = this.harborPoint(contact, right, forward, contact.rotation || -0.34);
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.harborStats.authoredAssets += 1;
    if (statName) this.harborStats[statName] = (this.harborStats[statName] || 0) + 1;
    return true;
  }

  createDataPierComposition(group, data) {
    const rotation = data.rotation || 0.68;
    this.addDataPierPad(group, data, -0.6, 1.8, 24, 13.2, this.world.materials.wood, rotation + 0.08, 'DataPierBoardwalkDeck');
    this.addDataPierPad(group, data, -7.8, -5.2, 10.5, 7.2, this.world.materials.sand, rotation - 0.16, 'DataPierSandThreshold');
    this.addDataPierPad(group, data, 7.2, -2.4, 8.6, 5.8, this.world.materials.paleStone, rotation + 0.1, 'DataPierSignalCourt');

    const [signX, signZ] = this.harborPoint(data, -9.6, -6.8, rotation);
    this.addSign(group, 'DATA', 'Visitor Trail', signX, signZ, rotation + 0.12, 0x79ffc5, 2.15, 'DataPierSign');
    this.addDataPierAsset(group, 'EnvPolishInfoKiosk', data, 8.8, -4.6, rotation + 0.12, 0.72, null);
    this.addDataPierAsset(group, 'EnvPolishHarborPier', data, -1.8, 9.2, rotation - 0.02, 1.04, 'piers');
    this.addDataPierAsset(group, 'EnvPolishDockFloat', data, -6.4, 15.8, rotation - 0.22, 0.92, 'piers');
    this.addDataPierAsset(group, 'EnvPolishHarborAntenna', data, 7.6, 4.2, rotation + 0.16, 0.76, null);
    this.addDataPierAsset(group, 'EnvPolishTerminalBank', data, -7.4, 2.8, rotation - 0.12, 0.64, null);
    this.addDataPierAsset(group, 'EnvPolishHarborCargoStack', data, 5.4, 7.6, rotation + 0.42, 0.7, 'cargoStacks');
    this.addDataPierAsset(group, 'EnvPolishHarborCargoStack', data, -10.4, -0.8, rotation - 0.38, 0.64, 'cargoStacks');
    this.addDataPierAsset(group, 'EnvPolishHarborShade', data, 3.8, -7.4, rotation + 0.04, 0.72, null);
    this.addDataPierAsset(group, 'EnvPolishWaveMarker', data, 3.6, 13.4, rotation + 0.26, 0.72, null);
    this.addDataPierAsset(group, 'EnvPolishShoreBuoy', data, -3.8, 17.6, rotation - 0.16, 0.78, null);
    this.addDataPierAsset(group, 'EnvPolishShorelineTidePool', data, -12.8, 8.8, rotation - 0.34, 0.82, null);
    this.addDataPierAsset(group, 'EnvPolishShorelineBreakwater', data, 9.4, 12.6, rotation + 0.18, 0.76, null);

    for (const side of [-1, 1]) {
      for (let i = 0; i < 4; i += 1) {
        const [x, z] = this.harborPoint(data, side * 10.9, -3.2 + i * 4.2, rotation);
        this.addDataPierRailPost(group, x, z, rotation, i % 2 ? this.world.materials.glow : this.world.materials.glowBlue);
      }
      const [railX, railZ] = this.harborPoint(data, side * 10.9, 3.1, rotation);
      this.box(group, railX, 1.06, railZ, 0.12, 0.12, 15.0, this.world.materials.darkWood, rotation, 'DataPierSideRail');
      this.box(group, railX, 0.64, railZ, 0.1, 0.09, 14.2, this.world.materials.wood, rotation, 'DataPierLowerRail');
      this.dataPierStats.deckRails += 2;
      this.districtCompositionStats.dataPierNodes += 2;
    }
    for (let i = 0; i < 8; i += 1) {
      const [markX, markZ] = this.harborPoint(data, -5.6 + i * 1.55, -5.6 + i * 1.7, rotation);
      this.addDataPierPathMark(group, markX, markZ, 0.28, 1.16, rotation + 0.08, i % 2 ? this.world.materials.glowBlue : this.world.materials.paleStone, 'DataPierBoardwalkGuideMark');
    }
    for (const [right, forward, color] of [
      [-10.8, -5.4, 0x79ffc5],
      [9.6, -4.2, 0x9ccfff],
      [-9.8, 9.8, 0x79ffc5],
      [8.4, 9.4, 0x79ffc5]
    ]) {
      const [lampX, lampZ] = this.harborPoint(data, right, forward, rotation);
      this.addDataPierLamp(group, lampX, lampZ, color, 2.55, 'DataPierLamp');
    }
    for (const [right, forward] of [
      [-2.4, 5.2],
      [4.8, 12.4],
      [-8.8, 13.2]
    ]) {
      const [beaconX, beaconZ] = this.harborPoint(data, right, forward, rotation);
      this.beacon(group, beaconX, beaconZ, 0x79ffc5);
      this.dataPierStats.beacons += 1;
      this.districtCompositionStats.dataPierNodes += 1;
    }
  }

  addDataPierPad(group, data, right, forward, width, depth, material, rotation, name) {
    const [x, z] = this.harborPoint(data, right, forward, data.rotation || 0.68);
    this.groundPatch(group, x, z, width, depth, material, 0.123, rotation, name, 811 + this.dataPierStats.pads);
    this.districtCompositionStats.pads += 1;
    this.districtCompositionStats.dataPierNodes += 1;
    this.dataPierStats.pads += 1;
  }

  addDataPierPathMark(group, x, z, width, depth, rotation, material, name) {
    this.addCompositionPathMark(group, x, z, width, depth, material, rotation, name);
    this.districtCompositionStats.dataPierNodes += 1;
    this.dataPierStats.pathMarks += 1;
  }

  addDataPierLamp(group, x, z, color, height, name) {
    this.addCompositionLamp(group, x, z, color, height, name);
    this.districtCompositionStats.dataPierNodes += 1;
    this.dataPierStats.lamps += 1;
  }

  addDataPierAsset(group, assetName, data, right, forward, rotation, scale, statName) {
    const [x, z] = this.harborPoint(data, right, forward, data.rotation || 0.68);
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.districtCompositionStats.dataPierNodes += 1;
    this.dataPierStats.authoredAssets += 1;
    if (statName) this.dataPierStats[statName] = (this.dataPierStats[statName] || 0) + 1;
    return true;
  }

  addDataPierRailPost(group, x, z, rotation, glowMaterial) {
    this.box(group, x, 0.72, z, 0.16, 1.15, 0.16, this.world.materials.darkWood, rotation, 'DataPierRailPost');
    this.box(group, x, 1.34, z, 0.34, 0.18, 0.34, glowMaterial, rotation, 'DataPierRailLamp');
    this.dataPierStats.deckRails += 1;
    this.districtCompositionStats.dataPierNodes += 1;
  }

  createCircuitStartComposition(group, circuit) {
    const x = circuit.position[0];
    const z = circuit.position[2];
    const rotation = -0.22;
    this.addCircuitPad(group, x + 2, z + 6.4, 24, 14, this.world.materials.stuntRamp, rotation, 'CircuitStartGridPad');
    this.addCircuitPad(group, x - 9.6, z + 1.2, 5.2, 12, this.world.materials.paleStone, rotation, 'CircuitPitLanePad');

    this.addSign(group, 'CIRCUIT', 'Checkpoint Run', ...this.circuitPoint(circuit, -12.4, -8.8, rotation), rotation + 0.62, 0xff9b6d, 2.4, 'CircuitSign');
    this.addCircuitAsset(group, 'EnvPolishCircuitGate', circuit, 0.6, 7.4, rotation, 1.04, null);
    this.addCircuitAsset(group, 'EnvPolishStuntCheckpoint', circuit, 1.0, 15.0, rotation, 0.92, 'checkpointGates');
    this.addCircuitAsset(group, 'EnvPolishStuntScoreTower', circuit, -12.5, 3.2, rotation + 0.44, 0.86, 'scoreTowers');
    this.addCircuitAsset(group, 'EnvPolishStuntScoreTower', circuit, 13.5, -1.2, rotation - 0.58, 0.72, 'scoreTowers');
    this.addCircuitAsset(group, 'EnvPolishStuntArrowFence', circuit, -13.8, 10.4, rotation + 0.08, 0.78, 'arrowFences');
    this.addCircuitAsset(group, 'EnvPolishStuntArrowFence', circuit, 13.8, 6.2, rotation + Math.PI, 0.74, 'arrowFences');
    this.addCircuitAsset(group, 'EnvPolishRoadBarrier', circuit, -14.5, -4.8, rotation + 0.3, 0.78, 'pitDetails');
    this.addCircuitAsset(group, 'EnvPolishRoadBarrier', circuit, 14.3, -5.6, rotation - 0.22, 0.78, 'pitDetails');
    this.addCircuitAsset(group, 'EnvPolishRouteLantern', circuit, -8.8, 13.4, rotation - 0.3, 0.7, 'laneLights');
    this.addCircuitAsset(group, 'EnvPolishRouteLantern', circuit, 8.6, 13.2, rotation + 0.26, 0.7, 'laneLights');

    this.checkerStripe(group, x + 1, z + 8, 20, rotation);
    for (let row = 0; row < 4; row += 1) {
      for (const side of [-1, 1]) {
        const [gridX, gridZ] = this.circuitPoint(circuit, side * (2.3 + row * 1.55), 2.2 - row * 2.55, rotation);
        this.addCircuitGridMark(group, gridX, gridZ, 1.45, 0.16, rotation + side * 0.08, row % 2 ? this.world.materials.glowBlue : this.world.materials.warmGlow, 'CircuitStartGridMark');
      }
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 5; i += 1) {
        const [railX, railZ] = this.circuitPoint(circuit, side * 13.0, -3.6 + i * 3.0, rotation);
        this.addCircuitGridMark(group, railX, railZ, 0.34, 1.7, rotation, this.world.materials.paleStone, 'CircuitOuterCurbMarker');
      }
    }
    for (let i = 0; i < 4; i += 1) {
      const [lightX, lightZ] = this.circuitPoint(circuit, -5.1 + i * 3.4, 11.2, rotation);
      this.box(group, lightX, 0.28, lightZ, 0.56, 0.12, 0.56, i < 2 ? this.world.materials.glow : this.world.materials.glowPink, rotation, 'CircuitStartLightTile');
      this.circuitStartStats.laneLights += 1;
    }
    this.addYardEdgeDetails(group, x + 2, z + 6.4, 24, 14);
  }

  circuitPoint(circuit, right, forward, rotation) {
    const x = circuit.position[0] + Math.cos(rotation) * right + Math.sin(rotation) * forward;
    const z = circuit.position[2] - Math.sin(rotation) * right + Math.cos(rotation) * forward;
    return [x, z];
  }

  addCircuitPad(group, x, z, width, depth, material, rotation, name) {
    this.groundPatch(group, x, z, width, depth, material, 0.122, rotation, name, 701 + this.circuitStartStats.pads);
    this.districtCompositionStats.pads += 1;
    this.circuitStartStats.pads += 1;
  }

  addCircuitGridMark(group, x, z, width, depth, rotation, material, name) {
    this.box(group, x, 0.205, z, width, 0.035, depth, material, rotation, name);
    this.districtCompositionStats.pathMarks += 1;
    this.circuitStartStats.gridMarks += 1;
  }

  addCircuitAsset(group, assetName, circuit, right, forward, rotation, scale, statName) {
    const [x, z] = this.circuitPoint(circuit, right, forward, rotation);
    const placed = this.addCompositionAsset(group, assetName, x, z, rotation, scale);
    if (!placed) return false;
    this.circuitStartStats.authoredAssets += 1;
    if (statName) this.circuitStartStats[statName] = (this.circuitStartStats[statName] || 0) + 1;
    return true;
  }

  checkerStripe(group, x, z, width, rotation) {
    const tileWidth = 1.45;
    const count = Math.floor(width / tileWidth);
    for (let i = 0; i < count; i += 1) {
      const material = i % 2 === 0 ? this.world.materials.paleStone : this.world.materials.cable;
      this.box(group, x - width / 2 + i * tileWidth + tileWidth / 2, 0.215, z, tileWidth, 0.035, 1.4, material, rotation, 'CheckerStartTile');
    }
  }

  hedgeLine(group, x, z, length, rotation) {
    const count = Math.max(3, Math.floor(length / 4));
    for (let i = 0; i < count; i += 1) {
      const offset = -length / 2 + i * 4 + 2;
      const localX = Math.cos(rotation) * offset;
      const localZ = Math.sin(rotation) * offset;
      this.box(group, x + localX, 0.55, z + localZ, 3.4, 0.72, 0.68, this.world.materials.meadowDark, rotation, 'CampusHedge');
    }
  }

  flagPole(group, x, z, color) {
    this.cylinder(group, x, 1.75, z, 0.055, 3.5, this.world.materials.cable, 8, 'FlagPole');
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.88 });
    this.box(group, x + 0.55, 2.85, z, 1.05, 0.56, 0.035, material, 0, 'FlagBanner');
  }

  addWindBanner(group, x, z, rotation, color, index) {
    const banner = new THREE.Group();
    banner.name = `Life_WindBannerGroup_${index}`;
    this.cylinder(banner, 0, 1.25, 0, 0.045, 2.5, this.world.materials.darkWood, 7, `Life_WindBanner_${index}_Post`);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
    const cloth = new THREE.Mesh(new THREE.PlaneGeometry(1.05, 0.56, 1, 1), material);
    cloth.name = `Life_WindBanner_${index}`;
    cloth.position.set(0.57, 2.1, 0);
    banner.add(cloth);
    banner.position.set(x, 0.15, z);
    banner.rotation.y = rotation;
    group.add(banner);
    const entry = {
      kind: 'banner',
      mesh: cloth,
      baseScale: 1,
      range: 0.16,
      speed: 1.1 + index * 0.07,
      phase: index * 0.61
    };
    this.animated.push(entry);
    this.lifeItems.windBanners.push({ root: banner, entry });
    this.lifeStats.windBanners += 1;
  }

  antennaCluster(group, x, z, color) {
    const glow = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.78 });
    for (let i = 0; i < 3; i += 1) {
      const dx = i * 1.4 - 1.4;
      this.cylinder(group, x + dx, 1.75 + i * 0.25, z, 0.08, 3.5 + i * 0.5, this.world.materials.cable, 8, 'AntennaMast');
      this.box(group, x + dx, 3.0 + i * 0.45, z + 0.22, 1.4, 0.08, 0.08, glow, 0, 'AntennaGlowBar');
    }
  }

  createBenchFallback() {
    const group = new THREE.Group();
    this.box(group, 0, 0.55, 0, 2.1, 0.18, 0.48, this.world.materials.wood, 0, 'BenchSeat');
    this.box(group, 0, 0.98, -0.22, 2.1, 0.22, 0.22, this.world.materials.wood, 0, 'BenchBack');
    return group;
  }

  addPlanterCluster(group, x, z, color) {
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.04 });
    this.box(group, x, 0.22, z, 3.2, 0.34, 1.25, this.world.materials.paleStone, 0.14, 'PlanterStone');
    for (let i = 0; i < 5; i += 1) {
      const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.9 + i * 0.05, 5), material);
      tuft.name = 'PlanterGrass';
      tuft.position.set(x - 1.1 + i * 0.55, 0.78, z + Math.sin(i) * 0.32);
      tuft.rotation.y = i * 0.9;
      group.add(tuft);
    }
  }

  arrowMarker(group, x, z, rotation, color, name) {
    const marker = new THREE.Group();
    marker.name = name;
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.46, depthWrite: false });
    for (const side of [-1, 1]) {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.035, 1.46), mat);
      stripe.position.set(side * 0.3, 0, 0.1);
      stripe.rotation.y = side * -0.48;
      marker.add(stripe);
    }
    marker.position.set(x, 0.22, z);
    marker.rotation.y = rotation;
    group.add(marker);
  }

  campusArch(group, x, z, rotation) {
    const arch = new THREE.Group();
    arch.name = 'FCCCampusArch';
    this.cylinder(arch, -2.4, 1.55, 0, 0.18, 3.1, this.world.materials.campusBrick, 10, 'FCCArchLeft');
    this.cylinder(arch, 2.4, 1.55, 0, 0.18, 3.1, this.world.materials.campusBrick, 10, 'FCCArchRight');
    this.box(arch, 0, 3.08, 0, 5.3, 0.42, 0.42, this.world.materials.campusBrick, 0, 'FCCArchTop');
    this.box(arch, 0, 2.62, -0.06, 2.8, 0.12, 0.12, this.world.materials.paleStone, 0, 'FCCArchLintel');
    arch.position.set(x, 0.14, z);
    arch.rotation.y = rotation;
    group.add(arch);
  }

  securityGate(group, x, z, rotation) {
    const gate = new THREE.Group();
    gate.name = 'SecurityScannerGate';
    this.box(gate, -3.2, 2.1, 0, 0.38, 4.2, 0.48, this.world.materials.cable, 0, 'ScannerLeftPillar');
    this.box(gate, 3.2, 2.1, 0, 0.38, 4.2, 0.48, this.world.materials.cable, 0, 'ScannerRightPillar');
    this.box(gate, 0, 4.2, 0, 6.8, 0.34, 0.52, this.world.materials.cable, 0, 'ScannerTopBeam');

    const beamMaterial = this.world.materials.glowBlue.clone();
    beamMaterial.opacity = 0.24;
    this.securityScanMaterials.push(beamMaterial);
    for (let i = 0; i < 5; i += 1) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.3, 0.08), beamMaterial);
      beam.name = 'ScannerLightCurtain';
      beam.position.set(-2.0 + i, 2.2, 0.04);
      gate.add(beam);
    }

    gate.position.set(x, 0.16, z);
    gate.rotation.y = rotation;
    group.add(gate);
  }

  securityScanWaveField(group, x, z, rotation) {
    const material = this.world.materials.glowBlue.clone();
    material.opacity = 0;
    const geometry = new THREE.RingGeometry(1.4, 1.72, 6);
    geometry.rotateX(-Math.PI / 2);
    for (let i = 0; i < 3; i += 1) {
      const wave = new THREE.Mesh(geometry, material.clone());
      wave.name = 'SecurityScanWave';
      wave.position.set(x, 0.205 + i * 0.002, z);
      wave.rotation.y = rotation;
      wave.visible = false;
      wave.renderOrder = 42;
      group.add(wave);
      this.animated.push({
        kind: 'securityWave',
        mesh: wave,
        baseScale: 1.4 + i * 0.16,
        range: 2.8,
        speed: 0.42 + i * 0.08,
        phase: i * 0.3,
        rotationSpeed: 0.22 + i * 0.04
      });
      this.securityScanStats.scanWaves += 1;
    }
  }

  serverRack(group, x, z, rotation) {
    const rack = new THREE.Group();
    rack.name = 'SecurityServerRack';
    this.box(rack, 0, 1.25, 0, 1.2, 2.5, 0.75, this.world.materials.cable, 0, 'ServerBody');
    for (let i = 0; i < 5; i += 1) {
      this.box(rack, 0, 0.42 + i * 0.38, -0.39, 0.88, 0.08, 0.04, this.world.materials.screen, 0, 'ServerGlowLine');
    }
    rack.position.set(x, 0.16, z);
    rack.rotation.y = rotation;
    group.add(rack);
  }

  cable(group, a, b, c, color) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(...a),
      new THREE.Vector3(...b),
      new THREE.Vector3(...c)
    ]);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 18, 0.055, 8, false),
      new THREE.MeshStandardMaterial({ color, roughness: 0.8, metalness: 0.08 })
    );
    mesh.name = 'SecurityGroundCable';
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  beacon(group, x, z, color, { dynamicMaterial = false } = {}) {
    const beacon = new THREE.Group();
    beacon.name = 'SetPieceBeacon';
    this.cylinder(beacon, 0, 0.62, 0, 0.16, 1.24, this.world.materials.cable, 10, 'BeaconPost');
    const material = this.getBeaconGlowMaterial(color);
    const glow = dynamicMaterial
      ? new THREE.Mesh(this.beaconGlowGeometry, material.clone())
      : new THREE.Mesh(this.beaconGlowGeometry, material);
    glow.name = 'SetPieceBeaconGlow';
    glow.position.y = 1.34;
    beacon.add(glow);
    beacon.position.set(x, 0.16, z);
    group.add(beacon);
    return glow;
  }
}

function findZone(id) {
  const zone = worldZones.find((item) => item.id === id);
  return zone || { position: [0, 0, 0], radius: 10 };
}

function findPath(id) {
  return roadPaths.find((item) => item.id === id) || { points: [] };
}

function createSignAtlas() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return {
    canvas,
    context: canvas.getContext('2d'),
    texture,
    material: new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      side: THREE.FrontSide
    }),
    tileWidth: 512,
    tileHeight: 256,
    columns: 4,
    rows: 8,
    cursor: 0
  };
}

function drawSignPanel(ctx, x, y, title, subtitle, color) {
  ctx.clearRect(x, y - 18, 512, 256);
  ctx.fillStyle = 'rgba(4, 11, 18, 0.86)';
  roundRect(ctx, x + 18, y + 18, 476, 184, 18);
  ctx.fill();
  ctx.strokeStyle = new THREE.Color(color).getStyle();
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = '#f4fbff';
  ctx.font = '900 44px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, x + 256, y + 94);
  ctx.fillStyle = new THREE.Color(color).getStyle();
  ctx.font = '700 24px Arial';
  ctx.fillText(subtitle, x + 256, y + 142);
  ctx.beginPath();
  ctx.moveTo(x + 224, y + 166);
  ctx.lineTo(x + 288, y + 166);
  ctx.lineTo(x + 256, y + 190);
  ctx.closePath();
  ctx.fill();
}

function createSignBoardGeometry(width, height, rect) {
  const geometry = new THREE.PlaneGeometry(width, height);
  const uv = geometry.attributes.uv;
  for (let i = 0; i < uv.count; i += 1) {
    const u = uv.getX(i);
    const v = uv.getY(i);
    uv.setXY(
      i,
      rect.u0 + (rect.u1 - rect.u0) * u,
      rect.v0 + (rect.v1 - rect.v0) * v
    );
  }
  uv.needsUpdate = true;
  return geometry;
}

function makeHardscapePanelGeometry(width, depth, seed) {
  const halfWidth = width * 0.5;
  const halfDepth = depth * 0.5;
  const cutBase = Math.max(0.36, Math.min(width, depth) * 0.075);
  const cut = (offset) => cutBase * (0.72 + panelNoise(seed + offset) * 0.58);
  const points = [
    [-halfWidth + cut(1), -halfDepth],
    [halfWidth - cut(2), -halfDepth],
    [halfWidth, -halfDepth + cut(3)],
    [halfWidth, -halfDepth * 0.12],
    [halfWidth - cutBase * 0.34, 0],
    [halfWidth, halfDepth - cut(4)],
    [halfWidth - cut(5), halfDepth],
    [halfWidth * 0.18, halfDepth],
    [0, halfDepth - cutBase * 0.26],
    [-halfWidth + cut(6), halfDepth],
    [-halfWidth, halfDepth - cut(7)],
    [-halfWidth, halfDepth * 0.1],
    [-halfWidth + cutBase * 0.28, 0],
    [-halfWidth, -halfDepth + cut(8)]
  ];
  const shape = new THREE.Shape();
  points.forEach(([x, z], index) => {
    if (index === 0) shape.moveTo(x, z);
    else shape.lineTo(x, z);
  });
  shape.closePath();
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  return geometry;
}

function panelSeed(name, x, z) {
  let hash = 2166136261;
  const value = `${name}:${Math.round(x * 10)}:${Math.round(z * 10)}`;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function panelNoise(seed) {
  let value = seed >>> 0;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}
