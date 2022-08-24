import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";
import Types "Types";


actor Main {
  private stable var _userIndex = 0;
  private stable var _totalTokens = 0;
  private stable var _totalFunds = 1;
  private var _users : HashMap.HashMap<Principal, Types.User> = HashMap.HashMap(1, Principal.equal, Principal.hash);
  private var _tokens : HashMap.HashMap<Nat, Types.Token> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private var _funds : HashMap.HashMap<Nat, Types.Fund> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private stable var _userEntries : [(Principal, Types.User)] = [];
  private stable var _tokensEntries : [(Nat, Types.Token)] = [];
  private stable var _adminPrincipals : [Principal] = [
    Principal.fromText("2azua-e7lot-lbxmr-uf3zr-hc2qh-bocw7-euxcb-mzfzw-tpvog-oisgo-cqe"),
  ];

  // Check if user exist
  private func _isUserExist(principal : Principal) : Bool {
    switch(_users.get(principal)) {
      case null {
        return false;
      };
      case (?any) {
        return true;
      };
    };
  };

  // Check if principal is admin
  private func _isAdmin(principal : Principal) : Bool {
    switch(Array.find(_adminPrincipals, func (prim : Principal) : Bool {
      principal == prim
    })) {
      case null {
        false
      };
      case (?any) {
        return true;
      }
    }
  };

  // Create new user
  private func _newUser(principal : Principal) : Types.User {
    let newUser : Types.User = {
      principal : Principal = principal;
      var name : ?Text = null;
      var image : ?Text = null;
      var role : Types.UserRole = #normal;
      var tokens = TrieSet.empty();
    };
  };

  // Public func to call outside canister
  public func createUser(principal : Principal) : async Result.Result<Text, Text> {
    switch(_users.get(principal)) {
      case null {
        _users.put(principal, _newUser(principal));
        return #ok("User created");
      };
      case (?user) {
        return #err("User already created");
      };
    };
  };

  // User change their profile themselves
  public func changeUserInfo(principal : Principal, displayName : ?Text, profileImage : ?Text) : async Result.Result<Text, Text>{
    if(not _isUserExist(principal)) {
      return #err("User not found!");
    };

    switch(_users.get(principal)) {
      case (?user) {
        
        let temp : Types.User = {
          principal = principal;
          var name = displayName;
          var image = profileImage;
          var role = user.role;
          var tokens = user.tokens;
        };
        _users.put(principal, temp);
        return #err("User info changed"); 
      };
      case null {
        return #err("Something happened");
      }
    };
  };

  private func _getUserRole(principal : Principal) :  ?Types.UserRole   {
    switch(_users.get(principal)) {
      case null {
        return null
      };
      case (?user) {
        switch(user.role) {
          case (#normal) {
            return (?#normal);
          };
          case (#organization) {
            return (?#organization);
          };
          case (#verifiedUser) {
            return (?#verifiedUser);
          };
          case (#admin) {
            return (?#admin)
          };
        };
      };
    }; 
  };

  public query func getUserRole(principal : Principal) : async  ?Types.UserRole   {
    switch(_users.get(principal)) {
      case null {
        return null
      };
      case (?user) {
        switch(user.role) {
          case (#normal) {
            return (?#normal);
          };
          case (#organization) {
            return (?#organization);
          };
          case (#verifiedUser) {
            return (?#verifiedUser);
          };
          case (#admin) {
            return (?#admin)
          };
        };
      };
    }; 
  };

  public query func getUserInfoByPrincipal(principal : Principal) : async ?Types.UserExt {
    switch(_users.get(principal)) {
      case null {
        return null;
      };
      case (?user) {
        let result : Types.UserExt = {
          principal = user.principal;
          name = user.name;
          image = user.image;
          role = user.role;
          tokens = TrieSet.toArray(user.tokens);
        };

        return ?result;
      };
    };
  };


  // Set user role, only changed by admin
  public func setUserRole(callerPrincipal : Principal,userPrincipal : Principal, userRole : Types.UserRole) : async Result.Result<Text, Text> {
    if(not _isUserExist(userPrincipal)) {
      return #err("User doesn't exist!")
    };
    if(not _isAdmin(callerPrincipal)) {
      return #err("You don't have permission to change their role!")
    };

    switch(_users.get(userPrincipal)) {
      case null {
        return#err("User doesn't exist!");
      };
      case (?user) {
         user.role := userRole;
        _users.put(userPrincipal, user);
      };
    };

    return#ok("User role changed");
  };

  public query func getAllTokens() : async [Types.TokenInfoExt] {
    var result : [Types.TokenInfoExt] = [];
    for(element in _tokens.vals()) {
      let temp : Types.TokenInfoExt = {
        collection = element.collection;
        index = element.index;
        operator = element.operator;
        owner = element.owner;
        timestamp = element.timestamp;
        tokenMetadata = element.tokenMetadata;
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  public query func getAllUsers() : async [Types.UserExt] {
    var result : [Types.UserExt] = [];
    for(element in _users.vals()) {
      let temp : Types.UserExt = {
        name = element.name;
        principal = element.principal;
        image = element.image;
        role = element.role;
        tokens = TrieSet.toArray(element.tokens);
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  private func _newFund(fundExt : Types.FundExt) : Types.Fund {
    
    let result : Types.Fund = {
      createAt = fundExt.createAt;
      story = fundExt.story;
      activities = fundExt.activities;
      endAt = fundExt.endAt;
      founder = fundExt.founder;
      id = _totalFunds;
      limit = fundExt.limit;
      name = fundExt.name;
      var raisedFund = 0;
      var tokens = TrieSet.empty();
      image = fundExt.image;
    };

    _totalFunds := _totalFunds + 1;

    return result;
  };

  public func createFund(who : Principal, fundInfo : Types.FundExt) : async Result.Result<Text, Text> {
    assert (_isUserExist(who));
    if(_isAdmin(who)) {
      _funds.put(_totalFunds, _newFund(fundInfo));
      return #ok("Ok");
    };
    switch(_getUserRole(who)) {
      case (organization) {
        _funds.put(_totalFunds, _newFund(fundInfo));
        return #ok("OK");
      };
      case null {
        return #err("Just organization or admin can create fund")
      };
    };
  };

  public query func getAllFunds() : async [Types.FundExt] {
    var result : [Types.FundExt] = [];
    for(element in _funds.vals()) {
      let temp : Types.FundExt = {
      createAt = element.createAt;
      story = element.story;
      activities = element.activities;
      endAt = element.endAt;
      founder = element.founder;
      id = element.id;
      limit = element.limit;
      name = element.name;
      raisedFund = element.raisedFund;
      tokens = TrieSet.toArray(element.tokens);
      image = element.image;
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  public func addTokensToFunds(who : Principal, fundId : Nat, tokens : [Nat]) : async Result.Result<Text, Text> {
    switch(_funds.get(fundId)) {
      case null {
        return #err("No fund with given id found");
      };
      case (?fund) {
        if (fund.founder != who) {
          return #err("You aren't the owner of this fund!")
        };
        let temp : Types.Fund = {
          createAt = fund.createAt;
          story = fund.story;
          activities = fund.activities;
          endAt = fund.endAt;
          founder = fund.founder;
          id = fund.id;
          limit = fund.limit;
          name = fund.name;
          var raisedFund = fund.raisedFund;
          var tokens = TrieSet.fromArray<Nat>(tokens, Hash.hash, Nat.equal);
          image = fund.image;
        };
        _funds.put(fundId, temp);
        return #ok("Done");
      };
    };  
};

public query func getFundInfo(fundId : Nat) : async ?Types.FundExt {
  switch(_funds.get(fundId)) {
      case null {
        return null;
      };
      case (?fund) {
        let temp : Types.FundExt = {
          createAt = fund.createAt;
          story = fund.story;
          activities = fund.activities;
          endAt = fund.endAt;
          founder = fund.founder;
          id = fund.id;
          limit = fund.limit;
          name = fund.name;
          raisedFund = fund.raisedFund;
          tokens = TrieSet.toArray<Nat>(fund.tokens);
          image = fund.image;
        };
        return ?temp;
      };
    };  
};



  // !!
  system func preupgrade() {
    _userEntries := Iter.toArray<(Principal, Types.User)>(_users.entries());
    _tokensEntries := Iter.toArray<(Nat, Types.Token)>(_tokens.entries());
  };

  // !!
  system func postupgrade() {
    _users := HashMap.fromIter<Principal, Types.User>(_userEntries.vals(), 1, Principal.equal, Principal.hash);
    _tokens := HashMap.fromIter<Nat, Types.Token>(_tokensEntries.vals(), 1, Nat.equal, Hash.hash);
    _userEntries := [];
    _tokensEntries := [];
  };
};
