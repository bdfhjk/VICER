define([
    "./ResolveInstr",
    "./FetchInstr",
    "./ReturnInstr",
    "./AddInstr",
    "./SubInstr",
    "./AssignInstr",
    "./CallInstr",
    "./BranchInstr",
    "./EqInstr",
    "./LeqInstr",
    "./LessInstr",
    "./NotInstr",
    "./RefInstr",
    "./DerefInstr",
    "./PaddInstr",
    "./VaEndInstr",
    "./NoopInstr"
], function(ResolveInstr, FetchInstr, ReturnInstr, AddInstr, SubInstr, AssignInstr,
                CallInstr, BranchInstr, EqInstr, LeqInstr, LessInstr, NotInstr,
                RefInstr, DerefInstr, createPointerOp, VaEndInstr, NoopInstr) {

        return {
            "RESOLVE": ResolveInstr,
            "FETCH": FetchInstr,
            "RETURN": ReturnInstr,
            "ADD": AddInstr,
            "SUB": SubInstr,
            "ASSIGN": AssignInstr,
            "CALL": CallInstr,
            "BRANCH": BranchInstr,
            "EQ": EqInstr,
            "LEQ": LeqInstr,
            "LESS": LessInstr,
            "NOT": NotInstr,
            "REF": RefInstr,
            "DEREF": DerefInstr,
            "PADD": createPointerOp("PADD"),
            "PSUB": createPointerOp("PSUB"),
            "VAEND": VaEndInstr,
            "NOOP": NoopInstr
        };
        
});
