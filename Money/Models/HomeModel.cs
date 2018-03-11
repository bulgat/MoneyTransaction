using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Money.Models
{
    public class HomeModel
    {
        public static string GetAccountName(DataClientEntities _dataClient, int accontId) {
            return _dataClient.Account.FirstOrDefault(a => a.Id == accontId).Name;
        }
        public static string GetAccountNameCheckId(DataClientEntities _dataClient, int checkId)
        {
            int? accountId = _dataClient.Check.FirstOrDefault(a => a.Id == checkId).AccountId;
            return GetAccountName(_dataClient, (int)accountId);
        }

    }
    public class AccountWeb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
    }
    public class CneckAccountWeb
    {
        public int Id { get; set; }
        public string NameAccount { get; set; }
        public decimal? Money { get; set; }
    }
    public class TransferWebModel
    {
        public int MasterCheckId { get; set; }
        public int SlaveCheckId { get; set; }
        public int Money { get; set; }

    }
    public class TrasactionWeb
    {
        public int Id { get; set; }
        public string NameDonor { get; set; }
        public string NameAcceptor { get; set; }
        public DateTime Date { get; set; }
        public int Money { get; set; }

    }
}