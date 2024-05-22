import { DomainDialogue } from 'product-types/dist/dialog/DomainDialogue';


export interface IDialogueService {
    create (user1Id: string, user2Id: string): Promise<DomainDialogue>;

    remove (userInitiatorId: string, dialogId: string): Promise<DomainDialogue>;

    archive (userInitiatorId: string, dialogId: string): Promise<DomainDialogue>;
}