import { DomainDialogue } from 'product-types/dist/dialogue/DomainDialogue';


export interface IDialogueService {
    createPrivate (userId: string, withUserId: string): Promise<Array<[ Array<string>, DomainDialogue ]>>;

    create (userId: string, userIds: Array<string>): Promise<Array<[ Array<string>, DomainDialogue ]>>;

    leave (userId: string, dialogueId: string): Promise<Array<[ Array<string>, DomainDialogue ]>>;

    archive (userId: string, dialogueId: string): Promise<Array<[ Array<string>, DomainDialogue ]>>;

    updateTitle (userId: string, dialogueId: string, title: string): Promise<Array<[ Array<string>, DomainDialogue ]>>;

    updateAvatar (userId: string, dialogueId: string, avatar: string): Promise<Array<[ Array<string>, DomainDialogue ]>>;
}