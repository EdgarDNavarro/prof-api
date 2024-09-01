// src/seed.ts
import { StudentLevel } from '../../enums';
import StudentLevels from '../models/StudentLevels';
import db from '../models/index'

async function seed() {
  try {
    await db.sync();

    const studentLevels = await StudentLevels.bulkCreate([
      { student_level: StudentLevel.BEGINNER },
      { student_level: StudentLevel.PRE_BEGINNER },
      { student_level: StudentLevel.INTERMEDIATE },
      { student_level: StudentLevel.UPPER_INTERMEDIATE },
      { student_level: StudentLevel.ADVANCED },
      { student_level: StudentLevel.NOT_SPECIFIED }
    ]);


    console.log('Data inserted correctly');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

seed();