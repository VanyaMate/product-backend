import {
    DomainPrivateDialogue,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogue';


export interface IPrivateDialogueService {
    create (userInId: string, userOutId: string): Promise<Array<[ Array<string>, DomainPrivateDialogue ]>>;

    archive (userId: string, privateDialogueId: string): Promise<Array<[ Array<string>, DomainPrivateDialogue ]>>;

    remove (userId: string, privateDialogueId: string): Promise<Array<[ Array<string>, DomainPrivateDialogue ]>>;

    updateTitle (userId: string, privateDialogueId: string, title: string): Promise<Array<[ Array<string>, DomainPrivateDialogue ]>>;

    updateAvatar (userId: string, privateDialogueId: string, avatar: string): Promise<Array<[ Array<string>, DomainPrivateDialogue ]>>;
}