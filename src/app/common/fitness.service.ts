export enum Gender {
  male = 'm',
  female = 'f',
}

export enum ReeVersion {
  harrisBenedict = 'hb',
  rozaShigal = 'rs',
  mifflinStJeor = 'mj',
}

export const TdeeCoefficient = {
  [ReeVersion.harrisBenedict]: {
    [Gender.male]: {
      weight: 13.75,
      height: 5,
      age: 6.76,
      base: 66.47,
    },
    [Gender.female]: {
      weight: 9.56,
      height: 1.85,
      age: 4.68,
      base: 655,
    },
  },
  [ReeVersion.rozaShigal]: {
    [Gender.male]: {
      weight: 13.397,
      height: 4.799,
      age: 5.677,
      base: 88.362,
    },
    [Gender.female]: {
      weight: 9.247,
      height: 3.098,
      age: 4.33,
      base: 447.593,
    },
  },
  [ReeVersion.mifflinStJeor]: {
    [Gender.male]: {
      weight: 10,
      height: 6.25,
      age: 5,
      base: -161,
    },
    [Gender.female]: {
      weight: 10,
      height: 6.25,
      age: 5,
      base: 5,
    },
  },
};

export class Fitness {
  public static ree(
    gender: Gender,
    version: ReeVersion,
    weight: number,
    height: number,
    age: number
  ) {
    const coefficients = TdeeCoefficient[version][gender];

    return (
      coefficients.weight * weight +
      coefficients.height * height -
      coefficients.age * age +
      coefficients.base
    );
  }

  public static tdee(
    gender: Gender,
    version: ReeVersion,
    activityLevel: number,
    weight: number,
    height: number,
    age: number
  ) {
    const ree = Fitness.ree(gender, version, weight, height, age);

    return activityLevel * ree;
  }

//   macros(ree){

	
// 	var bmr = 10 * kg + 6.25 * cm - 5 * age - 161

// 	//calories
// 	var caloriesv = {}
// 	//weightloss
// 	var dex = bmr * 0.04;
// 	caloriesv.weightloss = bmr - dex;
// 	//maintain %15 activity rating
// 	caloriesv.weightmaintain = bmr + bmr * 0.15;
// 	//gain %24 activity rating
// 	caloriesv.weightgain = bmr + bmr * 0.24;

// 	//Carbs
// 	var carbsv = {}
// 	//weightloss
// 	carbsv.weightloss = Math.round(bmr/9.78754579).toFixed(1);
// 	//weightmaintain
// 	carbsv.weightmaintain = Math.round(bmr/6.1623616).toFixed(1);
// 	//weightgain
// 	carbsv.weightgain = Math.round(bmr/5.20249221).toFixed(1);

// 	//protein
// 	var proteinv = bmr/12.97087379;

// 	//fat
// 	var fatv = Math.round(bmr/37.00831025).toFixed(1);
// 	return {
// 		carbs:carbsv,
// 		calories:caloriesv,
// 		fat:fatv,
// 		protein:JSON.stringify(Math.floor(proteinv))
// 	};
// }



  public static activityLevel(level: number) {
    const activityLevelBase = 1.2;
    const activityLevelStep = 0.175;
    return activityLevelBase + level * activityLevelStep;
  }
}
