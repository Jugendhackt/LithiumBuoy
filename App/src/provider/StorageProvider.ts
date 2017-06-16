import { Storage } from '@ionic/storage';

export function provideStorage(): Storage {
    return new Storage({});
}