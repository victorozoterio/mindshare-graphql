import { User } from "@prisma";
import { GqlUser } from "src/graphql/decorators/user.decorator";
import { IdeaModel } from "src/models/idea.model";
import { UserModel } from "src/models/user.model";
import { VoteModel } from "src/models/vote.model";
import { IdeaService } from "src/services/idea.service";
import { UserService } from "src/services/user.service";
import { VoteService } from "src/services/vote.service";
import { Arg, FieldResolver, Mutation, Resolver, Root } from "type-graphql";

@Resolver(() => VoteModel)
export class VoteResolver {
  private voteService = new VoteService();
  private ideaService = new IdeaService();
  private userService = new UserService();

  @Mutation(() => Boolean)
  async toggleVote(
    @Arg("ideaId", () => String) ideaId: string,
    @GqlUser() user: User,
  ): Promise<boolean> {
    await this.voteService.toggleVote(user.id, ideaId);
    return true;
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() vote: VoteModel): Promise<IdeaModel> {
    return this.ideaService.findIdea(vote.ideaId);
  }

  @FieldResolver(() => UserModel)
  async user(@Root() vote: VoteModel): Promise<UserModel> {
    return this.userService.findUser(vote.userId);
  }
}
