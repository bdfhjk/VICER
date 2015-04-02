define([
    "./ResolveInstr",
    "./FetchInstr",
    "./ReturnInstr",
    "./AddInstr",
    "./AssignInstr",
    "./CallInstr",
    "./BranchInstr",
    "./EqInstr",
    "./LeqInstr",
    "./NotInstr",
    "./RefInstr",
    "./DerefInstr",
    "./PaddInstr"
    ], function(ResolveInstr, FetchInstr, ReturnInstr, AddInstr, AssignInstr,
                CallInstr, BranchInstr, EqInstr, LeqInstr, NotInstr, RefInstr,
                DerefInstr, createPointerOp) {

        return {
            "RESOLVE": ResolveInstr,
            "FETCH": FetchInstr,
            "RETURN": ReturnInstr,
            "ADD": AddInstr,
            "ASSIGN": AssignInstr,
            "CALL": CallInstr,
            "BRANCH": BranchInstr,
            "EQ": EqInstr,
            "LEQ": LeqInstr,
            "NOT": NotInstr,
            "REF": RefInstr,
            "DEREF": DerefInstr,
            "PADD": createPointerOp("PADD"),
            "PSUB": createPointerOp("PSUB")
        };
        
});