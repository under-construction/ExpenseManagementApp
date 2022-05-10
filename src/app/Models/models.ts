export class Entity {
    id!: number;
    description!: string;
    amount!: number;

    constructor() {}
}

export class FrequentEntity extends Entity {
    frequencyId!: number;
    startDate!: string | number | Date;
    repetitionNumber!: number;

    constructor() { super(); }
}

export class OneTimeIncome extends Entity {
    date!: string | number | Date;

    constructor() { super(); }
}

export class OneTimeExpense extends Entity {
    date!: string | number | Date;

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
    daysCount!: number;

    constructor() {}
}