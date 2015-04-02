define([
    "./ResolveInstr",
    "./FetchInstr",
    "./ReturnInstr",
    "./AddInstr",
    "./AssignInstr",
    "./CallInstr",
    "./BranchInstr",
    "./EqInstr",
    "./NotInstr"
    ], function(ResolveInstr, FetchInstr, ReturnInstr, AddInstr, AssignInstr, CallInstr, BranchInstr, EqInstr, NotInstr) {

        return {
            "RESOLVE": ResolveInstr,
            "FETCH": FetchInstr,
            "RETURN": ReturnInstr,
            "ADD": AddInstr,
            "ASSIGN": AssignInstr,
            "CALL": CallInstr,
            "BRANCH": BranchInstr,
            "EQ": EqInstr,
            "NOT": NotInstr
        };
        
});