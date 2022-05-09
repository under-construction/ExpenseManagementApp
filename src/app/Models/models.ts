export class Entity {
    id!: number;
    description!: string;
    amount!: number;

    constructor() {}
}

export class FrequentEntity extends Entity {
    frequency!: string;

    constructor() { super(); }
}

export class OneTimeIncome extends Entity {

    constructor() { super(); }
}

export class OneTimeExpense extends Entity {

    constructor() { super(); }
}

export class RegularIncome extends FrequentEntity {

    constructor() { super(); }
}

export class RegularExpense extends FrequentEntity {

    constructor() { super(); }
}

export class Frequency {
    id!: number;
    description!: string;

    constructor() {}
}