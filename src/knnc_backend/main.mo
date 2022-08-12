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

  private func _newUser(principal : Principal) : Types.User {
    let newUser : Types.User = {
      principal : Principal = principal;
      var role : Types.UserRole = #normal;
      var tokens = TrieSet.empty();
    };
  };

  public func createUser(principal : Principal) : async Result.Result<Text, Text> {
    assert(not _isUserExist(principal));
    _users.put(principal, _newUser(principal));
    return #ok("User created");
  };

  public query func getUsers() : async [Types.UserExt] {
    var result : [Types.UserExt] = [];

    for(element in _users.vals()) {
      let temp : Types.UserExt = {
        principal = element.principal;
        role = element.role;
        tokens = TrieSet.toArray(element.tokens);
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  public func setUserRole(principal : Principal, userRole : Types.UserRole) : async Result.Result<Text, Text> {
    
    assert(_isUserExist(principal));

    switch(_users.get(principal)) {
      case null {
        return#err("User doesn't exist!");
      };
      case (?user) {
         user.role := userRole;
        _users.put(principal, user);
      };
    };

    return#ok("User role changed");
  };



  system func preupgrade() {
    _userEntries := Iter.toArray<(Principal, Types.User)>(_users.entries());
    _tokensEntries := Iter.toArray<(Nat, Types.Token)>(_tokens.entries());
  };

  system func postupgrade() {
    _users := HashMap.fromIter<Principal, Types.User>(_userEntries.vals(), 1, Principal.equal, Principal.hash);
    _tokens := HashMap.fromIter<Nat, Types.Token>(_tokensEntries.vals(), 1, Nat.equal, Hash.hash);
    _userEntries := [];
    _tokensEntries := [];
  };
};
