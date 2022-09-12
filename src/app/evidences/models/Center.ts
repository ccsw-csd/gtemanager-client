/**
 * Center: clase para manejo de datos de centros.
 */
export class Center {
    id: number;
    name: String;

    public constructor(init?: Partial<Center>) {
        Object.assign(this, init);
    }
}