import {Attribute} from './Attribute';

export class AttrValue {
    attrValueId: number;
    attrValue: string;
    attributeId: Attribute;

    constructor(attrValueId: number, attrValue: string, attributeId: Attribute) {
        this.attrValueId = attrValueId;
        this.attrValue = attrValue;
        this.attributeId = attributeId;
    }
}
