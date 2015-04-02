define([
    "./ResolveInstr",
    "./FetchInstr",
    "./PutInstr",
    "./ReturnInstr",
    "./AddInstr",
    "./AssignInstr",
    "./CallInstr",
    "./BranchInstr",
    "./EqInstr",
    "./NotInstr"
    ], function(ResolveInstr, FetchInstr, PutInstr, ReturnInstr, AddInstr, AssignInstr, CallInstr, BranchInstr, EqInstr, NotInstr) {

        return {
            "RESOLVE": ResolveInstr,
            "FETCH": FetchInstr,
            "PUT": PutInstr,
            "RETURN": ReturnInstr,
            "ADD": AddInstr,
            "ASSIGN": AssignInstr,
            "CALL": CallInstr,
            "BRANCH": BranchInstr,
            "EQ": EqInstr,
            "NOT": NotInstr
        };
        
});