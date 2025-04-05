import React, {FC} from "react";
import { Rule } from "../../types/rule";

interface JamRuleProps {
    rule: Rule;
}
export const JamRule : FC<JamRuleProps> = ({rule}) => {
    return (
        <div className="jam-rule">
            <h5>{rule.title.toUpperCase()}</h5>
            <p>{rule.description.toUpperCase()}</p>
        </div>
    );
}