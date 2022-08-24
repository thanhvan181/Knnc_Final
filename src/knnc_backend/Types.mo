import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";
module {
    public type User =  {
        principal : Principal;
        var name : ?Text;
        var image : ?Text;
        var role : UserRole;
        var tokens : TrieSet.Set<Nat>;
    };

    public type TokenInfoExt = {
        index : Nat;
        owner : Principal;
        tokenMetadata : TokenMetadata;
        operator : TokenOperator;
        timestamp : Time.Time;
        collection : Text;
    };

    public type UserExt = {
        principal : Principal;
        role : UserRole;
        name : ?Text;
        image : ?Text;
        tokens : [Nat];
    };

    public type UserRole = {
        #normal;
        #verifiedUser;
        #organization;
        #admin;
    };  

    public type TokenMetadata = {
        tokenUri : Text;
        tokenName : Text;
        createAt : Time.Time;
    };

    public type Token = {
        index : Nat;
        var owner : Principal;
        tokenMetadata : TokenMetadata;
        var operator : TokenOperator;
        var timestamp : Time.Time;
        collection : Text;
    };

    public type TokenOperator = {
        #mint;
        #transfer;
    };

    public type MintResult = {
        #error;
        #ok;
    };

    public type Record = {
      #user : Principal;
      #metadata : TokenMetadata  
    };

    public type TxRecord = {
        caller : Principal;
        operator : TokenOperator;
        txIndex : Nat;
        tokenIndex : Nat;
        from : Record;
        to : Record;
        timestamp : Time.Time;
    };

    public type Fund = {
        id : Nat;
        founder : Principal;
        limit  : Nat;
        var raisedFund : Float;
        name : Text;
        var tokens : TrieSet.Set<Nat>;
        story : Text;
        activities : Text;
        createAt : Time.Time;
        endAt : Time.Time;
        image : Text;
    };

    public type FundExt = {
        id : Nat;
        founder : Principal;
        limit  : Nat;
        raisedFund : Float;
        name : Text;
        tokens : [Nat];
        story : Text;
        activities : Text;
        createAt : Time.Time;
        endAt : Time.Time;
        image : Text;
    };
    
    
}