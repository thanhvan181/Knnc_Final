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
        var address: ?Text;
        var phoneNumber : ?Text;
    };

    public type TokenInfoExt = {
        index : Nat;
        owner : Principal;
        tokenMetadata : TokenMetadata;
        collection : Text;
        price : Float;
    };

    public type UserExt = {
        principal : Principal;
        role : UserRole;
        name : ?Text;
        image : ?Text;
        tokens : [Nat];
        address: ?Text;
        phoneNumber : ?Text;
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
        collection : Text;
        var price : Float;
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
        txIndex : Nat;
        tokenIndex : Nat;
        from : Record;
        to : Record;
        timestamp : Time.Time;
    };

    public type Fund = {
        id : Nat;
        founder : Principal;
        limit  : Float;
        var raisedFund : Float;
        name : Text;
        collection : Collection;
        story : Text;
        activities : Text;
        createAt : Time.Time;
        endAt : Time.Time;
        image : Text;
    };

    public type FundExt = {
        id : Nat;
        founder : Principal;
        limit  : Float;
        raisedFund : Float;
        name : Text;
        collection : CollectionExt;
        story : Text;
        activities : Text;
        createAt : Time.Time;
        endAt : Time.Time;
        image : Text;
    };

    public type Collection = {
        name : Text;
        numberOfTokens : Nat;
        description : Text;
        tokens : TrieSet.Set<Nat>;
    };

    public type CollectionExt = {
        name : Text;
        numberOfTokens : Nat;
        description : Text;
        tokens : [Nat];
    };

    public type Post = {
        postId : Nat;
        title : Text;
        who : Principal;
        image : Text;
        content : Text;
        var like : Nat;
        var whoLikeThis : [Principal];
    };

    public type PostExt = {
        postId : Nat;
        title : Text;
        who : Principal;
        image : Text;
        content : Text;
        like : Nat;
        whoLikeThis : [Principal];
    };

    
    
    
}