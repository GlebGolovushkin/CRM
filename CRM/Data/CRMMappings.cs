using AutoMapper;
using CRM.Data.Entities;
using CRM.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Data
{
    public class CRMMappings: Profile
    {
        public CRMMappings()
        {

            CreateMap<Process, ProcessViewModel>()
                .ForMember(o => o.Id, vm => vm.MapFrom(o => o.Id))
                .ForMember(vm => vm.Tasks, opt => opt.MapFrom(x => x.Tasks.Select(y => y.Task).ToList()))
                .ReverseMap();

            CreateMap<Task, TaskViewModel>()
                .ForMember(o => o.Id, vm => vm.MapFrom(o => o.Id))
                .ForMember(vm => vm.Resources, opt => opt.MapFrom(x => x.Resources.Select(y => y.Resource).ToList()))
                .ForMember(vm => vm.Products, opt => opt.MapFrom(x => x.Products.Select(y => y.Product).ToList()))
                .ReverseMap();

            CreateMap<User, UserViewModel>()
                .ForMember(o => o.Email, vm => vm.MapFrom(o => o.Email))
                .ReverseMap();

            CreateMap<Resource, ResourceViewModel>()
                .ForMember(o => o.Id, vm => vm.MapFrom(o => o.Id))
                .ReverseMap();
        }
    }
}
