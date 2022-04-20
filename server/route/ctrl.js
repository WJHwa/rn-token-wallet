const db = require("../db");
const crypto = require("crypto");
const ethers = require("ethers");
const bip39 = require("bip39");

const salt = crypto.randomBytes(32).toString();

const ctrl = {
  register: async (req, res) => {
    // const value = wallet.address + ":" + wallet.privateKey + ":" + mnemonic;
    const { id, name, password } = req.body;
    const mnemonic = bip39.generateMnemonic();
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const privatekey = wallet.privateKey;
    const hashedPw = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha256")
      .toString("hex");

    try {
      const result = await db.query(
        "SELECT * FROM native_W.user WHERE user_id=?",
        id
      );
      if (!result[0]) {
        await db.query(
          "INSERT INTO native_W.user(user_password,user_id,user_address,user_salt,user_name) VALUES(?,?,?,?,?);",
          [hashedPw, id, wallet.address, salt, name]
        );
        return res.send({
          address: wallet.address,
          mnemonic: mnemonic,
          privateKey: privatekey,
        });
      } else {
        res.send(false);
      }
    } catch (err) {
      res.send(false);
    }
  },
  login: async (req, res) => {
    const { id, password } = req.body;

    try {
      const result = await db.query(
        "SELECT * FROM native_W.user WHERE user_id = ?",
        id
      );
      if (result[0].length === 1) {
        const { salt, pw, address } = result[0];
        const hashedPw = crypto
          .pbkdf2Sync(password, salt, 10000, 64, "sha256")
          .toString("hex");
        if (pw === hashedPw) res.send({ address: address });
      }
    } catch (err) {
      res.send(false);
    }
  },
  keylogin: async (req, res) => {
    const { id, key } = req.body;

    try {
      const result = await db.query(
        "SELECT * FROM native_W.user WHERE user_id = ?",
        id
      );
      if (result[0].length === 1) {
        let { salt, mnemonic, private, keys } = result[0];
        const hashed = crypto
          .pbkdf2Sync(key, salt, 10000, 64, "sha256")
          .toString("hex");
        if (mnemonic === hashed || private === hashed) res.send({ key: keys });
      }
    } catch (err) {
      res.send(false);
    }
  },
  getAddress: (req, res) => {
    let item = req.headers.authorization;
    console.log(item);

    db.query(
      "SELECT * FROM native_W.user_address WHERE user_id = ?",
      items[0],
      (err, result) => {
        if (result) {
          res.send(result);
        } else {
          res.send(false);
        }
      }
    );
  },
  Walletupdate: async (req, res) => {
    const { id, password, address } = req.body;

    try {
      const result = await db.query(
        "SELECT * FROM native_W.user WHERE user_id = ?",
        id
      );
      if (result[0]) {
        let salt = result[0].user_salt;
        let pw = result[0].user_password;
        const hashedPw = crypto
          .pbkdf2Sync(password, salt, 10000, 64, "sha256")
          .toString("hex");
        if (pw === hashedPw) {
          const result = await db.query(
            "INSERT INTO native_W.user_address(user_id,user_address) VALUES (?,?);",
            [id, address]
          );
          res.send(true);
        } else {
          res.send(false);
        }
      }
    } catch (err) {
      res.send(false);
    }
  },
  Postreceipt: (req, res) => {
    const { to, value, hash, gas, address } = req.body;

    try {
      db.query(
        "INSERT INTO native_W.receipt(re_gas,re_to,re_value,re_hash,re_address) VALUES (?,?,?,?,?);",
        [gas, to, value, hash, address],
        (err, result) => {
          if (!err) res.send(true);
        }
      );
    } catch (err) {
      res.send(false);
    }
  },
  getHistory: async (req, res) => {
    let item = JSON.parse(req.headers.authorization);
    let address = item.address;

    try {
      const result = await db.query(
        "SELECT * FROM native_W.receipt WHERE re_address = ?",
        address
      );
      return res.send(result[0]);
    } catch (err) {
      res.send(false);
    }
  },
  Master: async (req, res) => {
    const { value, hash, gas, name } = req.body;

    try {
      await db.query(
        "INSERT INTO native_W.master(ma_gas,ma_value,ma_hash,ma_name) VALUES (?,?,?,?);",
        [gas, value, hash, name]
      );
      return res.send(true);
    } catch (err) {
      res.send(false);
    } finally {
      db.end();
    }
  },
};

module.exports = ctrl;
