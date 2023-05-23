using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Money.Models
{
    public class Coin
    {
        public int Price;
        public string Name { set; get; } ="Coin";
        public int Cost
        {
            get { return this.Price; }
            set { this.Price = value; }
        }
        public Coin(string name="CoinBig") {
            this.Name = name;
        }
        
    }
}
