import BOSS_MOVEMENT from './bosses/boss_properties/BOSS_MOVEMENT';
import TARGET_TYPES from './bosses/boss_properties/TARGET_TYPES';
import BOSS_PROPERTIES from './bosses/boss_properties/BOSS_PROPERTIES';

export default function getBossProperties(fight) {
  const difficulty = fight.difficulty;
  let props = BOSS_PROPERTIES[fight.boss];

  if (typeof props === 'undefined') {
    props = {};
  }

  if (props.hasOwnProperty(difficulty))
  {
    for (const prop in props[difficulty])
    {
      if (props[difficulty].hasOwnProperty(prop))
      {
        props[prop] = props[difficulty][prop];
      }
    }
  }

  // Assign default values, if no value in data
  if (!props.hasOwnProperty('targetType')) {
    props.targetType = TARGET_TYPES.UNDEFINED;
  }
  if (!props.hasOwnProperty('addsAliveFor')) {
    props.addsAliveFor = 0;
  }
  if (!props.hasOwnProperty('cleave')) {
    props.cleave = false;
  }
  if (!props.hasOwnProperty('secondaryPrioTarget')) {
    props.secondaryPrioTarget = false;
  }
  if (!props.hasOwnProperty('movement')) {
    props.movement = BOSS_MOVEMENT.UNDEFINED;
  }

  return props;
}
