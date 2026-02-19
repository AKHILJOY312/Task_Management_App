// import { inject, injectable } from "inversify";
// import { TYPES } from "@/config/di/types";

// import { UnauthorizedError } from "@/application/error/AppError";
// import {
//   SearchMembersRequestDTO,
//   MemberSearchResponseDTO,
// } from "@/application/dto/task/taskDto";
// import { ISearchProjectMembersUseCase } from "@/application/ports/use-cases/task/interfaces";
// import { IMemberRepository } from "@/application/ports/repositories/IMemberRepository ";
// import { IUserRepository } from "@/application/ports/repositories/IUserRepository";

// @injectable()
// export class SearchProjectMembersUseCase implements ISearchProjectMembersUseCase {
//   constructor(
//     @inject(TYPES.MemberRepository)
//     private memberRepo: IMemberRepository,

//     @inject(TYPES.ProjectMembershipRepository)
//     private membershipRepo: IUserRepository,
//   ) {}

//   async execute(
//     input: SearchMembersRequestDTO,
//     managerId: string,
//   ): Promise<MemberSearchResponseDTO> {
//     const members = await this.memberRepo.searchMembersByProject(
//       input.projectId,
//       input.query,
//     );

//     return { members };
//   }
// }
