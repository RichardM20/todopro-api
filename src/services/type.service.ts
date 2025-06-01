import Types from "../models/type.model";
import { IType } from "../types/type.types";
import { MaxDataLimitError, UserAlreadyExist } from "../utils/errors/api_errors";

class TypeService {
  async getTypes(userId: string): Promise<(IType & { taskCount: number })[]> {
    const typesWithCounts = await Types.aggregate([
      { $match: { userId } },
      {
        $addFields: {
          stringId: { $toString: "$_id" },
        },
      },
      {
        $lookup: {
          from: "tasks",
          let: { typeIdString: "$stringId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$type._id", "$$typeIdString"],
                },
              },
            },
          ],
          as: "tasks",
        },
      },
      {
        $addFields: {
          taskCount: { $size: "$tasks" },
        },
      },
      {
        $project: {
          id: "$stringId",
          name: 1,
          taskCount: 1,
        },
      },
    ]);

    return typesWithCounts;
  }

  async addType(userId: string, type: IType): Promise<void> {
    const query = { userId, name: type.name };

    const [existingType, totalTypes] = await Promise.all([
      Types.findOne(query).lean(),
      Types.countDocuments({ userId }),
    ]);

    if (existingType) {
      throw new UserAlreadyExist("A task type with this name already exists");
    }

    if (totalTypes >= 3) {
      throw new MaxDataLimitError(
        "Limit reached. You cannot have more than 3 task types"
      );
    }

    const typeToInsert = {
      ...type,
      userId,
    };

    await Types.create(typeToInsert);
  }
}

export default TypeService;
