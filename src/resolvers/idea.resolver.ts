import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { IdeaModel } from "../models/idea.model";
import { IdeaService } from "../services/idea.service";
import { CreateIdeaInput } from "../dtos/input/idea.input";
import { IsAuth } from "../middlewares/auth.middleware";

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuth)
export class IdeaResolver {
  private ideaService = new IdeaService();

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg("data", () => CreateIdeaInput) data: CreateIdeaInput,
    @Arg("authorId", () => String) authorId: string,
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, authorId);
  }
}
