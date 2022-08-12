import Array "mo:base/Array";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import TrieSet "mo:base/TrieSet";
import Types "Types";


actor Main {
  private stable var _userIndex = 0;
  private stable var _totalTokens = 0;
  private var _users : HashMap.HashMap<Principal, Types.User> = HashMap.HashMap(1, Principal.equal, Principal.hash);
  private var _tokens : HashMap.HashMap<Nat, Types.Token> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private stable var _userEntries : [(Principal, Types.User)] = [];
  private stable var _tokensEntries : [(Nat, Types.Token)] = [];
  private stable var _adminPrincipals : [Principal] = [
    Principal.fromText("2azua-e7lot-lbxmr-uf3zr-hc2qh-bocw7-euxcb-mzfzw-tpvog-oisgo-cqe")
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
      var displayName : ?Text = null;
      var profileImage : ?Text = null;
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
          var displayName = displayName;
          var profileImage = profileImage;
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

  private func getUserRole(principal : Principal) :  ?Types.UserRole   {
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
          displayName = user.displayName;
          profileImage = user.profileImage;
          role = user.role;
          tokens = TrieSet.toArray(user.tokens);
        };

        return ?result;
      };
    };
  };

  // Return array of users
  public query func getUsers() : async [Types.UserExt] {
    var result : [Types.UserExt] = [];

    for(element in _users.vals()) {
      let temp : Types.UserExt = {
        principal = element.principal;
        role = element.role;
        displayName = element.displayName;
        profileImage = element.profileImage;
        tokens = TrieSet.toArray(element.tokens);
      };
      result := Array.append(result, [temp]);
    };

    return result;
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
