using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Money.Models;

namespace Money.Controllers
{
    public class HomeController : Controller
    {
        public static DataClientEntities _dataClient = new DataClientEntities(); 

        public ActionResult Index()
        {
            //var k = _dataClient.Account.ToList();
            List<Account> ссссссс = _dataClient.Account.ToList();
            var yyy = ссссссс.Cast<Account>().ToList();
            return View();
        }

        [HttpGet]
        public JsonResult GetNameСity(string authtoken)
        {
            return Json("Москва", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetNameRegion(string authtoken)
        {
            Coin kol = new Coin("STOP");
            var name = kol?.Name;
            Coin stop = null;
            Coin stop0 = null;
            var test = stop ?? new Ducat("");
            //stop ??= new Coin();
            //_ = stop ?? throw new Exception("STOP");
            object stopKrik = null;

            if (stopKrik is Coin ts)
            {
                System.Diagnostics.Debug.WriteLine("01 GetNameRegion  ts =  " + ts);
            }
            if (stopKrik is int num) {
                System.Diagnostics.Debug.WriteLine("02 GetNameRegion  num =  " + num);
            }
            if (stopKrik is null)
            {
                System.Diagnostics.Debug.WriteLine("03 GetName null =  "  );
            }
            /*
            if (stopKrik is not null)
            {
                System.Diagnostics.Debug.WriteLine("04 Get not null =  ");
            }
*/
            /*
            if (stop0 is not object)
            {
                System.Diagnostics.Debug.WriteLine("06 Get  null =  ");
            }
            */
            
            stopKrik = "tttttttt";
            stopKrik = new Coin("STOP");
      
            switch (stopKrik)
            {
                case string s:
                    {
                        System.Diagnostics.Debug.WriteLine("07 Ge  =  " + s);
                    }
                    break;
                case Coin kol0 when kol0.Name == "STOP":
                    {
                        System.Diagnostics.Debug.WriteLine("08 Ge  =  " + kol0);
                    }
                    break;
            }
            System.Diagnostics.Debug.WriteLine("09 GetNameRegion    name " + name);
            System.Diagnostics.Debug.WriteLine("10 GetName     name " + test);

            return Json("Московская обл.", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetNameCountry(string authtoken)
        {
            return Json("Россия", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetNameBank(string authtoken)
        {
            return Json("Московский Банк", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetNameBankStreet(string authtoken)
        {
            return Json("ул. Петровка", JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetName(string authtoken)
        {
           List<AccountWeb> accountWeb_ar = _dataClient.Account.Select(a=>new AccountWeb() {
               Id = a.Id,
               Name = a.Name,
               Address = a.Address
           }).ToList();

            return Json(accountWeb_ar, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetClient(string authtoken)
        {
            List<AccountWeb> accountWeb_ar = _dataClient.Account.Select(a => new AccountWeb()
            {
                Id = a.Id,
                Name = a.Name,
                Address = a.Address
            }).ToList();


            return Json(accountWeb_ar, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult TransferCheckAccount(TransferWebModel model)
        {
            if (model.MasterCheckId==model.SlaveCheckId) {
                return Json("error", JsonRequestBehavior.AllowGet);
            }

            Check masterAccount = _dataClient.Check.FirstOrDefault(a => a.Id == model.MasterCheckId);
            Check slaveAccount = _dataClient.Check.FirstOrDefault(a => a.Id == model.SlaveCheckId);


            masterAccount.Money -= model.Money;
            slaveAccount.Money+= model.Money;

            Transaction transaction = new Transaction()
            {
                CheckIdDonor = masterAccount.Id,
                CheckIdAcceptor = slaveAccount.Id,
                Date = DateTime.Now,
                Money = model.Money
            };
            //_dataClient.Check.u;


            _dataClient.Transaction.Add(transaction);
            _dataClient.SaveChanges();


            return Json("ok", JsonRequestBehavior.AllowGet);
        }


        [HttpGet]
        public JsonResult GetCheckAllAccount()
        {
            List<Check> check_ar = _dataClient.Check.ToList();
            List<CneckAccountWeb> checkWeb_ar = new List<CneckAccountWeb>();
            foreach (var check in check_ar)
            {
                string accountName = HomeModel.GetAccountName(_dataClient, (int)check.AccountId);
                checkWeb_ar.Add(new CneckAccountWeb()
                {
                    Id = check.Id,
                    NameAccount = accountName,
                    Money = check.Money
                });
            }

            return Json(checkWeb_ar, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetCneckAccount(string AccountId)
        {
            List<CneckAccountWeb> checkWeb_ar = null;
            if (AccountId != null)
            {
                if (String.IsNullOrEmpty(AccountId) == false && AccountId!="null")
                {
                    int accontId = Convert.ToInt32(AccountId);
                    string accountName = HomeModel.GetAccountName(_dataClient, accontId);

                    checkWeb_ar = _dataClient.Check.Where(a => a.AccountId == accontId).Select(a => new CneckAccountWeb()
                    {
                        Id = a.Id,
                        NameAccount = accountName,
                        Money = a.Money
                    }).ToList();
                }
            }
            return Json(checkWeb_ar, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetCneckOne(string CheckId)
        {
            CneckAccountWeb checkAccountWeb = null;
            if (String.IsNullOrEmpty(CheckId) == false && CheckId!="null")
            {
                int checkId = Convert.ToInt32(CheckId);
                Check check = _dataClient.Check.FirstOrDefault(a => a.Id == checkId);
                string accountName = HomeModel.GetAccountName(_dataClient, (int)check.AccountId);
                checkAccountWeb = new CneckAccountWeb()
                {
                    Id = check.Id,
                    NameAccount = accountName,
                    Money = check.Money
                };
            }
            return Json(checkAccountWeb, JsonRequestBehavior.AllowGet);
        }
    [HttpGet]
        public JsonResult SaveCneckAccount(string AccountId,string Money)
        {
            int accontId = Convert.ToInt32(AccountId);
            int money = Convert.ToInt32(Money);

            Check check = new Check()
            {
                AccountId = accontId,
                Money = money
            };
            _dataClient.Check.Add(check);
            _dataClient.SaveChanges();


            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult SaveAccount(string AccountName, string Address)
        {
            
            Account account = new Account()
            {
                Name=AccountName,
                Address = Address
            };
            _dataClient.Account.Add(account);
            _dataClient.SaveChanges();


            return Json("ok", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult GetAllTransaction() {
            List<TrasactionWeb> trasactionWeb_ar = new List<TrasactionWeb>();
            List<Transaction> transaction_ar = _dataClient.Transaction.ToList();

            foreach(var transaction in transaction_ar)
            {

                string accountNameAcceptor = HomeModel.GetAccountNameCheckId(_dataClient, (int)transaction.CheckIdAcceptor);
                string accountNameDonor = HomeModel.GetAccountNameCheckId(_dataClient, (int)transaction.CheckIdDonor);

                trasactionWeb_ar.Add(new TrasactionWeb() {
                    Id =transaction.Id,
                    NameAcceptor = accountNameAcceptor,
                    NameDonor = accountNameDonor,
                    Date = (DateTime)transaction.Date,
                    Money = (int)transaction.Money
                });
            }

            return Json(trasactionWeb_ar, JsonRequestBehavior.AllowGet);
        }


        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Transaction()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

    }
}