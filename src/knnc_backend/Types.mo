import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";
module {
    public type User =  {
        principal : Principal;
        var displayName : ?Text;
        var profileImage : ?Text;
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
        displayName : ?Text;
        profileImage : ?Text;
        tokens : [Nat];
    };

    public type UserRole = {
        #normal;
        #verifiedUser;
        #organization;
    };  

    public type TokenMetadata = {
        tokenUri : Text;
        tokenName : Text;
        createAt : Time.Time;
    };

    public type Token = {
        index : Nat;
        var owner : User;
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




}