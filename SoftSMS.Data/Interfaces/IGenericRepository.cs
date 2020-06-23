using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace SoftSMS.Data.Interfaces
{
    public interface IGenericRepository<T> where T:class
    {
        IEnumerable<T> GetAll();
        T GetById(object id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(object id);
    }
}
