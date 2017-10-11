import React from 'react';
import SpellIcon from 'common/SpellIcon';
import SpellLink from 'common/SpellLink';
import StatisticBox, { STATISTIC_ORDER } from 'Main/StatisticBox';
import Module from 'Parser/Core/Module';
import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import Combatants from 'Parser/Core/Modules/Combatants';

class OnethsIntuition extends Module {
  static dependencies = {
    combatants: Combatants,
  };
  
  isStarsurge(event) {
    const spellId = event.ability.guid;
    return spellId === SPELLS.STARSURGE_MOONKIN.id;
  } 
  
  isStarfall(event) {
	const spellId = event.ability.guid;
	return spellId === SPELLS.STARFALL_CAST.id;
  }
  
  isStarsurgeFree(event) {
	const spellId = event.ability.guid;
	return spellId === SPELLS.ONETHS_FREE_STARSURGE.id;
  }
  
  isStarfallFree(event) {
	const spellId = event.ability.guid;
	return spellId === SPELLS.ONETHS_FREE_STARFALL.id;
  }

  on_initialized() {
    this.active = this.combatants.selected.hasWrists(ITEMS.ONETH_INTUITION.id);
  }

  OIProcsPotentiallyWasted = 0;
  starfallFree = false;
  starsurgeFree = false;

  on_byPlayer_cast(event) {
	if (!this.isStarfall(event) && !this.isStarsurge(event)) return;
	
	if (this.isStarsurge(event)) {
	  this.starsurgeFree = false;
	  if (this.starfallFree)
		this.OIProcsPotentiallyWasted++;
	}
	else if (this.isStarfall(event)) {
	  this.starfallFree = false;
	  if (this.starsurgeFree)
		this.OIProcsPotentiallyWasted++;
	}
  }
  
  on_toPlayer_applybuff(event) {
	if (this.isStarsurgeFree(event))
	  this.starsurgeFree = true;
    else if (this.isStarfallFree(event))
	  this.starfallFree = true;
  }

  suggestions(when) {
    const OIProcsPotentiallyWastedPerMinute = Math.round((((this.OIProcsPotentiallyWasted) / (this.owner.fightDuration / 1000)) * 60)*10) / 10;

    when(OIProcsPotentiallyWastedPerMinute).isGreaterThan(0)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span> You casted <SpellLink id={SPELLS.STARSURGE_MOONKIN.id} /> while a free <SpellLink id={SPELLS.STARFALL_CAST.id} /> buff was up (or vice versa). Try to use <SpellLink id={SPELLS.ONETHS_FREE_STARSURGE.id} /> buffs before casting the other spell. </span>)
          .icon(SPELLS.ONETHS_FREE_STARSURGE.icon)
          .actual(`Wasted ${actual} potential OI procs per minute`)
          .recommended(`${recommended} wasted potential procs recommended`)
          .regular(recommended + 0.5).major(recommended + 1);
      });
  }

  statistic() {
    return (
      <StatisticBox
        icon={<SpellIcon id={SPELLS.ONETHS_FREE_STARSURGE.id} />}
        value={this.OIProcsPotentiallyWasted}
        label="Potentially wasted OI procs"
		tooltip={'Procs from Oneth\'s Intuition should be used up before casting a new starfall/starsurge. The only exception is saving a free starfall for upcoming adds.'}
      />
    );
  }
  statisticOrder = STATISTIC_ORDER.CORE(11);
}

export default OnethsIntuition;
