import { CreateCommentInput } from "src/dtos/input/comment.input";
import { CommentModel } from "src/models/comment.model";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";
import { CommentService } from "src/services/comment.service";
import { GqlUser } from "src/graphql/decorators/user.decorator";
import { User } from "@prisma";
import { IdeaModel } from "src/models/idea.model";
import { IdeaService } from "src/services/idea.service";
import { UserModel } from "src/models/user.model";
import { UserService } from "src/services/user.service";

@Resolver(() => CommentModel)
export class CommentResolver {
  private commentService = new CommentService();
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => CommentModel)
  async createComment(
    @Arg("ideaId", () => String) ideaId: string,
    @Arg("data", () => CreateCommentInput) data: CreateCommentInput,
    @GqlUser() user: User,
  ) {
    return this.commentService.create(ideaId, user.id, data);
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findIdea(comment.ideaId);
  }

  @FieldResolver(() => UserModel)
  async author(@Root() comment: CommentModel): Promise<UserModel> {
    return this.userService.findUser(comment.authorId);
  }
}
