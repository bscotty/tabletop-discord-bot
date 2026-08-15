import {DivineDictionary} from "../divine-dictionary";
// import alacrityGifts from "../../../../../rpg-data/godbound/alacrity-gifts.json"
// import apotheosisGifts from "../../../../../rpg-data/godbound/apotheosis-gifts.json"
// import artificeGifts from "../../../../../rpg-data/godbound/artifice-gifts.json"
// import artificialIntelligenceGift from "../../../../../rpg-data/godbound/artificial-intelligence-gifts.json"
// import beastsGift from "../../../../../rpg-data/godbound/beasts-gifts.json"
// import birdsGift from "../../../../../rpg-data/godbound/birds-gifts.json"
// import bowGift from "../../../../../rpg-data/godbound/bow-gifts.json"
// import citiesGift from "../../../../../rpg-data/godbound/cities-gifts.json"
// import commandGift from "../../../../../rpg-data/godbound/command-gifts.json"
// import danceGift from "../../../../../rpg-data/godbound/dance-gifts.json"
// import deathGift from "../../../../../rpg-data/godbound/death-gifts.json"
// import deceptionGift from "../../../../../rpg-data/godbound/deception-gifts.json"
// import desertGift from "../../../../../rpg-data/godbound/desert-gifts.json"
// import desireGift from "../../../../../rpg-data/godbound/desire-gifts.json"
// import dragonGift from "../../../../../rpg-data/godbound/dragon-gifts.json"
// import earthGift from "../../../../../rpg-data/godbound/earth-gifts.json"
// import enduranceGift from "../../../../../rpg-data/godbound/endurance-gifts.json"
// import engineeringGift from "../../../../../rpg-data/godbound/engineering-gifts.json"
// import entropyGift from "../../../../../rpg-data/godbound/entropy-gifts.json"
// import faerieQueenGift from "../../../../../rpg-data/godbound/faerie-queen-gifts.json"
// import fateGift from "../../../../../rpg-data/godbound/fate-gifts.json"
// import fearGift from "../../../../../rpg-data/godbound/fear-gifts.json"
// import fertilityGift from "../../../../../rpg-data/godbound/fertility-gifts.json"
// import fireGift from "../../../../../rpg-data/godbound/fire-gifts.json"
// import healthGift from "../../../../../rpg-data/godbound/health-gifts.json"
// import insectsGift from "../../../../../rpg-data/godbound/insects-gifts.json"
// import intoxicationGift from "../../../../../rpg-data/godbound/intoxication-gifts.json"
// import invocationsOfTheGate from "../../../../../rpg-data/godbound/invocations-of-the-gate.json"
// import invocationsOfTheThrone from "../../../../../rpg-data/godbound/invocations-of-the-throne.json"
// import invocationsOfTheWay from "../../../../../rpg-data/godbound/invocations-of-the-way.json"
// import journeyingGifts from "../../../../../rpg-data/godbound/journeying-gifts.json"
// import jungleGifts from "../../../../../rpg-data/godbound/jungle-gifts.json"
// import knowledgeGifts from "../../../../../rpg-data/godbound/knowledge-gifts.json"
// import lichKingGifts from "../../../../../rpg-data/godbound/lich-king-gifts.json"
// import luckGifts from "../../../../../rpg-data/godbound/luck-gifts.json"
// import madnessGifts from "../../../../../rpg-data/godbound/madness-gifts.json"
// import martyrdomGifts from "../../../../../rpg-data/godbound/martyrdom-gifts.json"
// import mightGifts from "../../../../../rpg-data/godbound/might-gifts.json"
// import murderGifts from "../../../../../rpg-data/godbound/murder-gifts.json"
// import musicGifts from "../../../../../rpg-data/godbound/music-gifts.json"
// import networkGifts from "../../../../../rpg-data/godbound/network-gifts.json"
// import nightGifts from "../../../../../rpg-data/godbound/night-gifts.json"
// import passionGifts from "../../../../../rpg-data/godbound/passion-gifts.json"
// import peakHumanGifts from "../../../../../rpg-data/godbound/peak-human-gifts.json"
// import protectionGifts from "../../../../../rpg-data/godbound/protection-gifts.json"
// import seaGifts from "../../../../../rpg-data/godbound/sea-gifts.json"
// import shapeshiftingGifts from "../../../../../rpg-data/godbound/shapeshifting-gifts.json"
// import skyGifts from "../../../../../rpg-data/godbound/sky-gifts.json"
// import sorceryGifts from "../../../../../rpg-data/godbound/sorcery-gifts.json"
// import sunGifts from "../../../../../rpg-data/godbound/sun-gifts.json"
// import swordGifts from "../../../../../rpg-data/godbound/sword-gifts.json"
// import theftGifts from "../../../../../rpg-data/godbound/theft-gifts.json"
// import timeGifts from "../../../../../rpg-data/godbound/time-gifts.json"
// import underworldGifts from "../../../../../rpg-data/godbound/underworld-gifts.json"
// import universalGifts from "../../../../../rpg-data/godbound/universal-gifts.json"
// import vengeanceGifts from "../../../../../rpg-data/godbound/vengeance-gifts.json"
// import warGifts from "../../../../../rpg-data/godbound/war-gifts.json"
// import wealthGifts from "../../../../../rpg-data/godbound/wealth-gifts.json"
// import winterGifts from "../../../../../rpg-data/godbound/winter-gifts.json"
// import words from "../../../../../rpg-data/godbound/words.json"

export function getDictionary(): DivineDictionary {
    throw Error("Cannot create divine dictionary")
    // imported from outside the project in order to avoid committing intellectual property to git
    // return new DivineDictionary(
    //     [
    //         ...alacrityGifts,
    //         ...apotheosisGifts,
    //         ...artificeGifts,
    //         ...artificialIntelligenceGift,
    //         ...beastsGift,
    //         ...birdsGift,
    //         ...bowGift,
    //         ...citiesGift,
    //         ...commandGift,
    //         ...danceGift,
    //         ...deathGift,
    //         ...deceptionGift,
    //         ...desertGift,
    //         ...desireGift,
    //         ...dragonGift,
    //         ...earthGift,
    //         ...enduranceGift,
    //         ...engineeringGift,
    //         ...entropyGift,
    //         ...faerieQueenGift,
    //         ...fateGift,
    //         ...fearGift,
    //         ...fertilityGift,
    //         ...fireGift,
    //         ...healthGift,
    //         ...insectsGift,
    //         ...intoxicationGift,
    //         ...journeyingGifts,
    //         ...jungleGifts,
    //         ...knowledgeGifts,
    //         ...lichKingGifts,
    //         ...luckGifts,
    //         ...madnessGifts,
    //         ...martyrdomGifts,
    //         ...mightGifts,
    //         ...murderGifts,
    //         ...musicGifts,
    //         ...networkGifts,
    //         ...nightGifts,
    //         ...passionGifts,
    //         ...peakHumanGifts,
    //         ...protectionGifts,
    //         ...seaGifts,
    //         ...shapeshiftingGifts,
    //         ...skyGifts,
    //         ...sorceryGifts,
    //         ...sunGifts,
    //         ...swordGifts,
    //         ...theftGifts,
    //         ...timeGifts,
    //         ...underworldGifts,
    //         ...universalGifts,
    //         ...vengeanceGifts,
    //         ...warGifts,
    //         ...wealthGifts,
    //         ...winterGifts,
    //     ],
    //     words,
    //     [
    //         ...invocationsOfTheGate,
    //         ...invocationsOfTheThrone,
    //         ...invocationsOfTheWay
    //     ]
    // )
}