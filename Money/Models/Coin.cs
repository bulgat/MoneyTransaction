using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

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
            Stack<char> stack_ar = new Stack<char>();
            stack_ar.Push('c');
            stack_ar.Push('o');
            stack_ar.Push('i');
            stack_ar.Push('n');
            System.Diagnostics.Debug.WriteLine("10 GetName     na count = " + stack_ar.Count);
            char k = stack_ar.Peek();
            System.Diagnostics.Debug.WriteLine("11 GetNameRegion    name " + k);
            stack_ar.Pop();
            System.Diagnostics.Debug.WriteLine("12 Get not count=  "+ stack_ar.Count);

            Stack<int> stackInt_ar = new Stack<int>();
        }
        
    }
}
