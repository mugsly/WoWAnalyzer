import bosses from 'common/bosses';
import BOSS_DIFFICULTIES from './BOSS_DIFFICULTIES';
import BOSS_MOVEMENT from './BOSS_MOVEMENT';
import TARGET_TYPES from './TARGET_TYPES';

/**
 * This file holds all the properties bosses can have,
 * if a property is not stated for a boss it's default is used.
 * (Defaults can be found in getBossProperties.js)
 *
 * Currently available properties:
 *   targetType: UNDEFINED, SINGLETARGET, SINGLETARGETWITHADDWAVES, TWOTARGET, TWOTARGETWITHADDWAVES, AOE
 *   addsAliveFor: The expected time adds live in seconds - feelycraft
 *   cleave: True if cleave hits all/most targets
 *   secondaryPrioTarget: True if the fight has an add that needs to be hardswapped to (Maiden add in Fallen Avatar)
 *   movement: UNDEFINED, LOW, MEDIUM, HIGH - feelycraft
 *
 * Only the values specifically stated in a difficulty are overwritten.
 */

export default {
  [bosses.TombOfSargeras.GOROTH]: {
    targetType: TARGET_TYPES.SINGLETARGET,
    movement: BOSS_MOVEMENT.LOW,
  },
  [bosses.TombOfSargeras.DEMONIC_INQUISITION]: {
    targetType: TARGET_TYPES.TWOTARGET,
    cleave: false,
    movement: BOSS_MOVEMENT.MEDIUM,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      targetType: TARGET_TYPES.TWOTARGETWITHADDWAVES,
      addsAliveFor: 15,
      movement: BOSS_MOVEMENT.HIGH,
    },
  },
  [bosses.TombOfSargeras.HARJATAN]: {
    targetType: TARGET_TYPES.SINGLETARGETWITHADDWAVES,
    addsAliveFor: 8,
    cleave: true,
    movement: BOSS_MOVEMENT.MEDIUM,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      addsAliveFor: 15,
    },
  },
  [bosses.TombOfSargeras.MISTRESS_SASSZINE]: {
    targetType: TARGET_TYPES.SINGLETARGETWITHADDWAVES,
    addsAliveFor: 8,
    cleave: true,
    movement: BOSS_MOVEMENT.MEDIUM,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      addsAliveFor: 15,
      movement: BOSS_MOVEMENT.HIGH,
    },
  },
  [bosses.TombOfSargeras.SISTERS_OF_THE_MOON]: {
    targetType: TARGET_TYPES.SINGLETARGET,
    movement: BOSS_MOVEMENT.LOW,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      secondaryPrioTarget: true,
      movement: BOSS_MOVEMENT.MEDIUM,
    },
  },
  [bosses.TombOfSargeras.THE_DESOLATE_HOST]: {
    targetType: TARGET_TYPES.SINGLETARGETWITHADDWAVES,
    addsAliveFor: 20,
    cleave: true,
    movement: BOSS_MOVEMENT.MEDIUM,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      targetType: TARGET_TYPES.AOE,
    },
  },
  [bosses.TombOfSargeras.MAIDEN_OF_VIGILANCE]: {
    targetType: TARGET_TYPES.SINGLETARGET,
    movement: BOSS_MOVEMENT.MEDIUM,
  },
  [bosses.TombOfSargeras.FALLEN_AVATAR]: {
    targetType: TARGET_TYPES.SINGLETARGET,
    secondaryPrioTarget: true,
    movement: BOSS_MOVEMENT.HIGH,
  },
  [bosses.TombOfSargeras.KILJAEDEN]: {
    targetType: TARGET_TYPES.SINGLETARGETWITHADDWAVES,
    addsAliveFor: 10,
    cleave: true,
    movement: BOSS_MOVEMENT.MEDIUM,
    [BOSS_DIFFICULTIES.MYTHIC]: {
      cleave: false,
      movement: BOSS_MOVEMENT.HIGH,
    },
  },
};
