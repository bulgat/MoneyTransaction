using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Money.Models
{
    public class Coin
    {
        public Coin(string name) {
            this.Name = name;
        }
        public string Name { set; get; }
    }
}
