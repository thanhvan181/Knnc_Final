import Array "mo:base/Array";
import Cap "./cap/Cap";
import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Root "./cap/Root";
import Time "mo:base/Time";
import TrieSet "mo:base/TrieSet";
import Types "Types";



actor Main {
  private stable var _userIndex = 0;
  private stable var _totalTokens = 0;
  private stable var _totalFunds = 0;
  private stable var _totalCollections = 0;
  private var _users : HashMap.HashMap<Principal, Types.User> = HashMap.HashMap(1, Principal.equal, Principal.hash);
  private var _tokens : HashMap.HashMap<Nat, Types.Token> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private var _funds : HashMap.HashMap<Nat, Types.Fund> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private var _collections : HashMap.HashMap<Nat, Types.Collection> = HashMap.HashMap(1, Nat.equal, Hash.hash);
  private stable var numberPost = 0;
  private stable var posts:[Types.Post] = [];
  private stable var _userEntries : [(Principal, Types.User)] = [];
  private stable var _tokensEntries : [(Nat, Types.Token)] = [];
  private stable var _fundEntries : [(Nat, Types.Fund)] = [];
  private stable var _adminPrincipals : [Principal] = [
    Principal.fromText("2azua-e7lot-lbxmr-uf3zr-hc2qh-bocw7-euxcb-mzfzw-tpvog-oisgo-cqe"),
  ];
  private stable let _FTName : Text = "BeeToken";
  private stable let _FTOwner : Principal = _adminPrincipals[0];
  private stable let _FTSymbol : Text = "BEE";
  private stable let _FTDecimals : Nat8  = 8;
  private stable let _FTTotalSupply : Nat = 1_000_000_000;
  private stable var _FTFee = 1_000;
  private stable var txcounter: Nat = 0;
  private var cap: ?Cap.Cap = null;
  private stable var blackhole : Principal = Principal.fromText("aaaaa-aa");
  private var _FTBalance : HashMap.HashMap<Principal, Nat> = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
  private stable var _FTBalanceEntries : [(Principal, Nat)] = [];
  _FTBalance.put(_FTOwner, _FTTotalSupply);
  private var _FTRecord = HashMap.HashMap<Nat, Types.FTTxRecord>(1, Nat.equal, Hash.hash);
  private var _NFTRecord = HashMap.HashMap<Nat, Types.NFTTxRecord>(1, Nat.equal, Hash.hash);
  private var _FTRecordEntries : [(Nat, Types.FTTxRecord)] = [];
  private var _NFTRecordEntries : [(Nat, Types.NFTTxRecord)] = [];


  private stable let _genesis : Types.FTTxRecord = {
        caller = ?_FTOwner;
        op = #mint;
        index = 0;
        from = blackhole;
        to = _FTOwner;
        amount = _FTTotalSupply;
        fee = 0;
        timestamp = Time.now();
        status = #succeeded;
  };

  private stable var _adminInfo : Types.User = {
    var FTTokens = _FTTotalSupply;
    var address = ?"FPT Polytechnic HN";
    var image = ?"implement soon";
    var name = ?"Admin";
    var phoneNumber = ?"Implement soon";
    principal = _FTOwner;
    var role = #admin;
    var tokens = TrieSet.empty();
  };

  _users.put(_FTOwner, _adminInfo);

   private func _addFTRecord(
        operation : Types.Operation,
        from : Principal, 
        to : Principal,
        amount : Nat,
        fee : Nat,
        timestamp : Time.Time,
        status : Types.TransactionStatus
        ): async () {
        txcounter +=1;
        let record : Types.FTTxRecord = {
          amount = amount;
          caller = ?from;
          fee = fee;
          from = from;
          index = txcounter;
          op = operation;
          status = status;
          timestamp = timestamp;
          to = to;
        };
        _FTRecord.put(txcounter,record);
    };

    private func _addNFTTxRecord(
      from : Principal,
      to : Principal,
      tokenId : Nat,
      operator : Types.Operation,
      timestamp : Time.Time,
    ) : async () {
      txcounter +=1;
      let record : Types.NFTTxRecord = {
        operator = operator;
        timestamp = timestamp;
        to = to;
        tokenId = tokenId;
        from = from;
      };
      _NFTRecord.put(txcounter, record);
    };

    public query func getFTTokenName() : async Text {
      _FTName;
    };

    public query func getFTTokenSupply() : async Nat {
      _FTTotalSupply;
    };

    public query func getFTTokenInfo() : async Types.FTMetadata {
      return {
        name = _FTName;
        owner = _FTOwner;
        symbol = _FTSymbol;
        decimal = _FTDecimals;
        totalSupply = _FTTotalSupply;
        fee = _FTFee;
      }
    };

    private func _FTBalanceOf(who : Principal) : Nat {
      switch(_users.get(who)) {
        case (?user) {
          let result : Nat = user.FTTokens;
          return result;
        };
        case null {
          0;
        }
      }
    };

    private func _chargeFee(spender : Principal, reciever : Principal,  fee : Nat) : async () {
      if(fee > 0) {
        await _addFTTokenTo(reciever, fee);
        await _removeFTFrom(spender, fee);
      };
    };

  private func _removeFTFrom(who : Principal, amount : Nat) : async ()  {
      assert(_isUserExist(who));
      switch(_users.get(who)) {
        case (?user) {
          user.FTTokens := user.FTTokens - amount;
        };
        case null {

        };
      };
  };

  public func setFTFee(newFee : Nat, who : Principal) : async () {
    assert(who == _FTOwner);
    _FTFee := newFee;
  };

  private func _addFTTokenTo(who : Principal, amount : Nat) : async () {
      assert(_isUserExist(who));
      switch(_users.get(who)) {
        case (?user) {
          user.FTTokens := user.FTTokens + amount ;
        };
        case null {

        };
      };
  };

  public query func getFTTokenOfUser(who : Principal) : async Nat {
    switch(_users.get(who)) {
      case (?user) {
        return user.FTTokens;
      };
      case null {
        0;
      };
    };
  };

  private func _getFTHolders() : [Principal] {
    var result : [Principal] = [];
    for(element in _users.vals()) {
      if(element.FTTokens > 0) {
        result := Array.append(result, [element.principal]);
      }
    };
    return result;
  };

  public query func getFTHolders() : async [Principal] {
    var result : [Principal] = [];
    for(element in _users.vals()) {
      if(element.FTTokens > 0) {
        result := Array.append(result, [element.principal]);
      }
    };
    return result;
  };


    

  public func transferFTFrom(from : Principal, to : Principal, amount : Nat) : async Result.Result<Text, Text> {
      assert (_FTBalanceOf(from) > _FTFee);
      assert (_isUserExist(from));
      assert (_isUserExist(to));
      assert (_FTBalanceOf(from) > amount);
      assert (amount > _FTFee);
      await _addFTTokenTo(to, amount);
      await _removeFTFrom(from, amount);
      await _chargeFee(from, _FTOwner, _FTFee);

      ignore _addFTRecord(
        #mint,
        from,
        to, 
        amount,
        _FTFee,
        Time.now(),
        #succeeded
      );

      return #ok("OK");
  };

  public func allowanceFT(from : Principal, to : Principal, amount : Nat) : async Result.Result<Text, Text> {
    assert (from == _FTOwner);
    assert (_FTBalanceOf(_FTOwner) > amount );
    await _addTokenTo(to, amount);
    await _removeFTFrom(from, amount);
    return #ok("OK");
  };

  public query func getFTRecords() : async [Types.FTTxRecord] {
    return Iter.toArray(_FTRecord.vals());
  };






 







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

  private func _isTokenExist(tokenId : Nat) : Bool {
    switch(_tokens.get(tokenId)) {
      case (null) {
        return false;
      };
      case (?token) {
        return true;
      }
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
    assert(not _isAdmin(principal));
    let newUser : Types.User = {
      principal : Principal = principal;
      var name : ?Text = null;
      var image : ?Text = null;
      var role : Types.UserRole = #normal;
      var tokens = TrieSet.empty();
      var address = null;
      var phoneNumber = null;
      var FTTokens = 0;
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
          var address = null;
          var phoneNumber = null;
          var FTTokens = user.FTTokens;
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
          address = user.address;
          phoneNumber = user.phoneNumber;
          FTTokens = user.FTTokens;
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
        owner = element.owner;
        tokenMetadata = element.tokenMetadata;
        price = element.price;
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
        address = element.address;
        phoneNumber = element.phoneNumber;
        FTTokens = element.FTTokens;
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  private func _addTokenTo(who : Principal, token : Nat) : async () {
    assert(_isUserExist(who));
    switch(_users.get(who)) {
      case null {
        return;
      };
      case (?user) {
        user.tokens := TrieSet.put<Nat>(user.tokens, token, 0, Nat.equal)
      };
    }
  };

  private func _removeTokenFrom(who : Principal, tokenId : Nat) : async () {
    assert(_isUserExist(who));
    switch(_users.get(who)) {
      case (?user) {
        var userTokens = TrieSet.toArray(user.tokens);
        userTokens := Array.filter(userTokens, func (i : Nat) : Bool {
          i != tokenId;
        });
        user.tokens := TrieSet.fromArray<Nat>(userTokens, Hash.hash, Nat.equal);
        _users.put(who, user);
      };
      case null {

      };
    };
  };

  private func _changeTokenOwner(to : Principal, tokenId : Nat) : async () {
    assert(_isUserExist(to));
    assert(_isTokenExist(tokenId));

    switch(_tokens.get(tokenId)) {
      case (?token) {
        token.owner := to;
        _tokens.put(tokenId, token);
      };
      case null {

      };
    };
  };

  public func singleMint(owner : Principal, tokenMetadata : Types.TokenMetadata, collection : Text, price : Float) : async Types.MintResult {
    assert(_isUserExist(owner));
    switch(_getUserRole(owner)) {
      case (?#verifiedUser) {
        await _addTokenTo(owner,  await _mint(owner, tokenMetadata, collection, price));
        return #ok;
      };
      case(?#admin) {
        await _addTokenTo(owner,  await _mint(owner, tokenMetadata, collection, price));
        return #ok;
      };
      case(?#organization) {
        await _addTokenTo(owner,  await _mint(owner, tokenMetadata, collection, price));
        return #ok;
      };
      case(?#normal) {
        return #error
      };
      case null {
         return #error
      };
    };
  };

  public query func getUsersHaveFTTokens() : async [Principal] {
    var result : [Principal] = [];
    for(element in _users.vals()) {
      if(element.FTTokens > 0) {
        result := Array.append(result, [element.principal]);
      };
    };
    return result;
  };

  private func _mint(owner : Principal, tokenMetadata : Types.TokenMetadata, collection : Text, price : Float) : async Nat {
    _totalTokens += 1;
    let token: Types.Token = {
      index = _totalTokens;
      var owner = owner;
      tokenMetadata = tokenMetadata ; 
      collection = collection;
       var price = price;
      };
    _tokens.put(_totalTokens, token);
    // add token to owner
    await _addTokenTo(owner, _totalTokens);
    return _totalTokens;
  };
  
  private func _batchMint(owner : Principal, tokenMetadata :  [Types.TokenMetadata], collection : Text,  numberOfTokens : Int, totalPrice : Float) : async [Nat] {
    var result : [Nat] = [];
    Debug.print("Batch mint calling");
    var startIndex = _totalTokens;
    var endIndex = startIndex + numberOfTokens;

    for(index in Iter.range(0, numberOfTokens - 1)) {
      
      Debug.print("Batch mint calling");
      let tokenIndex : Nat = await _mint(owner, tokenMetadata[index], collection, (totalPrice / Float.fromInt(numberOfTokens)));
      Debug.print("Batch mint calling at " # Nat.toText(index));
      result := Array.append<Nat>(result, [tokenIndex]);
    };
    return result;
  };

  private func _createCollection(name : Text, numberOfTokens : Nat, description : Text, tokens : [Types.TokenMetadata], owner : Principal, totalPrice : Float) : async Types.Collection {
    Debug.print("Create collection calling");
    let collection : Types.Collection = {
      name = name;
      description = description;
      numberOfTokens = numberOfTokens;
      tokens = TrieSet.fromArray<Nat>(await _batchMint(owner, tokens, name, numberOfTokens, totalPrice), Hash.hash, Nat.equal);
    };
    _totalCollections +=1;
    _collections.put(_totalCollections, collection);
    return collection;
  };

  public func createFund(founder : Principal, limit : Float, name : Text,  story : Text, activities : Text, endAt : Time.Time, image : Text, tokenMetadata : [Types.TokenMetadata],collectionName : Text, collectionDescription : Text) : async Result.Result<Text, Text> {
    switch(_getUserRole(founder)) {
      case (organization) {
        let collection = await _createCollection(collectionName, tokenMetadata.size(), collectionDescription, tokenMetadata, founder, limit);
        _totalFunds +=1;
        let fund : Types.Fund = {
          activities = activities;
          collection =  collection;
          createAt = Time.now();
          endAt = endAt;
          founder = founder;
          id = _totalFunds;
          image = image;
          limit = limit;
          name = name;
          var raisedFund = 0;
          story = story;
        };
        _funds.put(_totalFunds, fund);
        return #ok("Fund created")
      };
    }
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
      collection = {
        description = element.collection.description;
        name = element.collection.name;
        numberOfTokens = element.collection.numberOfTokens;
        tokens = TrieSet.toArray(element.collection.tokens)
      };
      image = element.image;
      };
      result := Array.append(result, [temp]);
    };

    return result;
  };

  public query func getFundInfoById(fundId : Nat) : async ?Types.FundExt {
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
            collection = {
              description = fund.collection.description;
              name = fund.collection.name;
              numberOfTokens = fund.collection.numberOfTokens;
              tokens = TrieSet.toArray(fund.collection.tokens)
            };
            image = fund.image;
          };
          return ?temp;
        };
      };  
  };

  public query func getAllCollections() : async [Types.CollectionExt] {
    var result : [Types.CollectionExt] = [];
    for(element in _collections.vals()) {
      let temp : Types.CollectionExt = {
          name = element.name;
          numberOfTokens = element.numberOfTokens;
          description = element.description;
          tokens = TrieSet.toArray(element.tokens);
        };
      result := Array.append(result, [temp]);
    };
    return result;
  };

  public query func getCollectionById(collectionId : Nat) : async ?Types.CollectionExt {
    switch(_collections.get(collectionId)) {
      case null {
        return null;
      };
      case (?collection) {
        let result : Types.CollectionExt = {
          name = collection.name;
          numberOfTokens = collection.numberOfTokens;
          description = collection.description;
          tokens = TrieSet.toArray(collection.tokens);
        };

        return ?result;
      }
    }
  };

  

  public query func getTokenInfoById(id : Nat) : async ?Types.TokenInfoExt {
    switch(_tokens.get(id)) {
      case null {
        return null;
      };
      case (?token) {
        let result : Types.TokenInfoExt = {
          collection = token.collection;
          index = token.index;
          owner = token.owner;
          tokenMetadata = token.tokenMetadata;
          price = token.price;
        };
        return ?result;
      };
    };
  };

  public query func getTotalFund() : async Nat {
    _totalFunds
  };

  public query func getTotalVerifiedUser() : async Nat {
    var result = 0;
    for (element in _users.vals()) {
      switch(element.role) {
        case (#verifiedUser) {
          result+=1;
        };
        case (#normal) {

        };
        case (#organization) {

        };
        case (#admin) {

        };
      };
      
    };
    return result;
  };

  public query func getTotalNFT() : async Nat {
    _totalTokens;
  };

  public query func getTotalPost() : async Nat {
    numberPost;
  };




  public func newPost (title:Text , who:Principal , image:Text , content:Text , like :Nat , whoLikeThis:[Principal]) : async () {
    let post : Types.Post = {
      postId = numberPost;
      title : Text = title ;
      who : Principal = who ;
      image : Text = image ;
      content : Text = content ;
      var like : Nat = like ;
      var whoLikeThis  = whoLikeThis ;
    };
    posts := Array.append(posts, [post]);
    numberPost +=1;
  };

  public query func getPosts () : async [Types.PostExt]{
    var result : [Types.PostExt] = [];
    for(val in posts.vals()){
      let temp : Types.PostExt = {
        postId = val.postId;
        title = val.title;
        who = val.who;
        image = val.image;
        content = val.content;
        like = val.like;
        whoLikeThis = val.whoLikeThis;
      };
      result := Array.append(result,[temp]);
    };
    result;
  };

  public query func getTokensOfUser(who : Principal) : async ?[Nat] {
    assert(_isUserExist(who));

    switch(_users.get(who)) {
      case null {
        return null;
      };
      case (?user) {
        let result : [Nat] = TrieSet.toArray(user.tokens);
        return ?result;
      };

    };
  };

  private func _isOwn(tokenId: Nat, who : Principal) : Bool {
    assert(_isUserExist(who));
    assert(_isTokenExist(tokenId));

    switch(_users.get(who)) {
      case null {
        false;
      };
      case (?user) {
        let userTokens = TrieSet.toArray(user.tokens);
        switch(Array.find(userTokens, func (i : Nat) : Bool {
          i == tokenId
        })) {
          case null {
            return false;
          };
          case (?any) {
            return true;
          };
        }
      };
    };
  };
public query func getPostById (id : Nat) : async [Types.PostExt]{
    var result : [Types.PostExt] = [];
    for(val in posts.vals()){
      if(val.postId == id){
        let temp : Types.PostExt = {
        postId = val.postId;
        title = val.title;
        who = val.who;
        image = val.image;
        content = val.content;
        like = val.like;
        whoLikeThis = val.whoLikeThis;
        };
        result := Array.append(result,[temp]);
        return result;
      };
    };
    result;
  };
  public func setTokenPrice(who : Principal,tokenId : Nat, newPrice : Float ) : async Result.Result<Text, Text> {
    assert(_isUserExist(who));
    assert(_isTokenExist(tokenId));
    assert(_isOwn(tokenId, who));

    switch(_tokens.get(tokenId)) {
      case (?token) {
        token.price := newPrice;
        _tokens.put(tokenId, token);
        return #ok("Price changed");
      };
      case null {
        return #err("There's something bad happened")
      }
    };

    return #ok("Price changed");
  };


  public func transferToken(from : Principal,to : Principal, tokenId : Nat) : async Result.Result<Text, Text> {
    assert(_isUserExist(from));
    assert(_isUserExist(to));
    assert(_isTokenExist(tokenId));
    assert(_isOwn(tokenId, from));

    await _addTokenTo(to, tokenId);
    await _removeTokenFrom(from, tokenId);
    await _changeTokenOwner(to, tokenId);

    
    return #ok("OK")
  };

  public func buyNFT(from : Principal, to : Principal, tokenId : Nat) : async Text {
    assert(_isUserExist(from));
    assert(_isUserExist(to));
    assert(_isTokenExist(tokenId));
    
    switch(_tokens.get(tokenId)) {
      case null {
        "error"
      };
      case (?token) {
        if(_FTBalanceOf(from) < Float.toInt(token.price)) {
         return "error";
        };
        await _removeTokenFrom(from, tokenId);
        await _addTokenTo(to, tokenId);
        await _changeTokenOwner(to, tokenId);
        await _addFTTokenTo(to, Int.abs(Float.toInt(token.price)));
        await _removeFTFrom(from, Int.abs(Float.toInt(token.price)));
        await _chargeFee(from, to, _FTFee);
        "ok"
      };
    };


  };



  


  // todo?
  // 1. Implement web3.storage to store user image link
  // 2. Improve mint NFT 
  // 3. Something new ....



  // !!
  system func preupgrade() {
    _userEntries := Iter.toArray<(Principal, Types.User)>(_users.entries());
    _tokensEntries := Iter.toArray<(Nat, Types.Token)>(_tokens.entries());
    _fundEntries := Iter.toArray<(Nat, Types.Fund)>(_funds.entries());
    _FTBalanceEntries := Iter.toArray<(Principal, Nat)>(_FTBalance.entries());
    _FTRecordEntries := Iter.toArray<(Nat, Types.FTTxRecord)>(_FTRecord.entries());
    _NFTRecordEntries := Iter.toArray<(Nat, Types.NFTTxRecord)>(_NFTRecord.entries());
  };

  // !!
  system func postupgrade() {
    _users := HashMap.fromIter<Principal, Types.User>(_userEntries.vals(), 1, Principal.equal, Principal.hash);
    _tokens := HashMap.fromIter<Nat, Types.Token>(_tokensEntries.vals(), 1, Nat.equal, Hash.hash);
    _funds := HashMap.fromIter<Nat, Types.Fund>(_fundEntries.vals(), 1, Nat.equal, Hash.hash);
    _FTBalance := HashMap.fromIter<Principal, Nat>(_FTBalanceEntries.vals(), 1, Principal.equal, Principal.hash);
    _FTRecord := HashMap.fromIter<Nat, Types.FTTxRecord>(_FTRecordEntries.vals(), 1, Nat.equal, Hash.hash);
    _NFTRecord := HashMap.fromIter<Nat, Types.NFTTxRecord>(_NFTRecordEntries.vals(), 1, Nat.equal, Hash.hash);
    _userEntries := [];
    _tokensEntries := [];
    _fundEntries := [];
    _FTBalanceEntries := [];
    _FTRecordEntries := [];
    _NFTRecordEntries := [];
    

  };
};
