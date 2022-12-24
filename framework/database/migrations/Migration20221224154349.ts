import { Migration } from '@mikro-orm/migrations';

export class Migration20221224154349 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `doctor` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null, `type` text check (`type` in (\'cardiologist\', \'oncologist\', \'oncologist\')) not null);');

    this.addSql('create table `patient` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null);');

    this.addSql('create table `appointment` (`id` integer not null primary key autoincrement, `patient_id` integer not null, `doctor_id` integer not null, constraint `appointment_patient_id_foreign` foreign key(`patient_id`) references `patient`(`id`) on delete cascade on update cascade, constraint `appointment_doctor_id_foreign` foreign key(`doctor_id`) references `doctor`(`id`) on delete cascade on update cascade);');
    this.addSql('create index `appointment_patient_id_index` on `appointment` (`patient_id`);');
    this.addSql('create index `appointment_doctor_id_index` on `appointment` (`doctor_id`);');
  }

}
