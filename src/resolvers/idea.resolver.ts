import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { CreateIdeaInput, UpdateIdeaInput } from "../dtos/input/idea.input";
import { IsAuth } from "../middlewares/auth.middleware";
import { GqlUser } from "../graphql/decorators/user.decorator";
import { User } from "@prisma";
import { UserModel } from "src/models/user.model";
import { UserService } from "src/services/user.service";
import { CommentModel } from "src/models/comment.model";
import { CommentService } from "src/services/comment.service";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService = new IdeaService();
  private userService = new UserService();
  private commentService = new CommentService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    @GqlUser() user: User,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id);
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg("data", () => UpdateIdeaInput) data: UpdateIdeaInput,
    @Arg("id", () => String) id: string,
  ): Promise<IdeaModel> {
    return this.ideaService.updateIdea(id, data);
  }

  @Mutation(() => Boolean)
  async deleteIdea(@Arg("id", () => String) id: string): Promise<boolean> {
    await this.ideaService.deleteIdea(id);
    return true;
  }

  @Query(() => [IdeaModel])
  async listIdeas(): Promise<IdeaModel[]> {
    return this.ideaService.listIdeas();
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUser(idea.authorId);
  }

  @FieldResolver(() => [CommentModel])
  async comments(@Root() idea: IdeaModel): Promise<CommentModel[]> {
    return this.commentService.listByIdeaId(idea.id);
  }
}
