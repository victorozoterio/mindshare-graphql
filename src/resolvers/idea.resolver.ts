import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { CreateIdeaInput } from "../dtos/input/idea.input";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma";
import { UserModel } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUser(idea.authorId);
  }
}
