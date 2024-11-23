insert into "userType" (id ,user_type) values ('s00001', 'sales');
insert into "userType" (id ,user_type) values ('a00001', 'admin');


insert into "user" (user_id ,first_name,last_name,email,contact_no,username,password,user_type_id ) values ('1','G', 'P', 'gp@gmail.com', '0832224645' , 'admin' , 'admin' , 'a00001');

insert into customer (customer_id, customer_name, address, email, contact_no, description) values ('4040b8ae-3977-4517-8259-5828840a1600','Phx Phamarcy','Bangkok','CPALL@gmail.com','0834442525','VIP Customer' );
insert into supplier (supplier_id, supplier_name, address, email, contact_no, description) values ('4040b8ae-3977-4517-8259-5828840a1600','CPALL','Bangkok','CPALL@gmail.com','0834442525','VIP Supplier' );